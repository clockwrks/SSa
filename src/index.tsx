import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { React } from 'enmity/metro/common';
import { getByProps } from 'enmity/metro';
import { create } from 'enmity/patcher';
import manifest from '../manifest.json';

import Settings from './components/Settings';

// Get the UserStore, which contains functions to retrieve user information.
const UserStore = getByProps('getCurrentUser');

// Create a patcher instance for this plugin.
const Patcher = create('display-name-changer');

const DisplayNameChanger: Plugin = {
    ...manifest,

    onStart() {
        const { settings } = this;
        const targetId = settings.get('targetId', null);

        // Check if a target ID has been set in the plugin's settings.
        if (targetId) {
            // Patch the function that gets the current user's profile.
            // This is a common way to modify how the current user's data is displayed.
            Patcher.instead(UserStore, 'getCurrentUser', () => {
                // Get the real current user.
                const currentUser = Patcher.original(UserStore, 'getCurrentUser')();
                // Get the target user from the UserStore using the ID from settings.
                const targetUser = UserStore.getUser(targetId);

                if (targetUser && currentUser) {
                    // Create a new user object with the target user's display name,
                    // but all other properties from the current user.
                    // This is a simple way to change the name without affecting other data.
                    return {
                        ...currentUser,
                        displayName: targetUser.username,
                        username: targetUser.username // Update both for consistency
                    };
                }

                // If no target user is found, return the original current user.
                return currentUser;
            });
        }
    },

    onStop() {
        // When the plugin is stopped, unpatch all changes to revert the display name.
        Patcher.unpatchAll();
    },

    getSettingsPanel({ settings }) {
        return <Settings settings={settings} />;
    }
};

registerPlugin(DisplayNameChanger);

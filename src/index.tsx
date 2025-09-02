import { FormRow, FormText, FormSwitch, FormDivider } from 'enmity/components';
import { SettingsStore } from 'enmity/api/settings';
import { React } from 'enmity/metro/common';
import { useState } from 'react';

interface SettingsProps {
    settings: SettingsStore;
}

export default ({ settings }: SettingsProps) => {
    // Use a state hook to manage the text input value locally.
    const [idInput, setIdInput] = useState(settings.get('targetId', ''));

    // Function to handle the ID being saved to the settings.
    const handleSave = (newId: string) => {
        // Save the new ID to the plugin's settings store.
        // It will be read by the plugin's `onStart` method.
        settings.set('targetId', newId);
        setIdInput(newId);
    };

    return (
        <FormRow
            label="Target User ID"
            subLabel="Enter the Discord ID of the user whose name you want to use."
            trailing={
                <FormText
                    value={idInput}
                    onChangeText={handleSave}
                    placeholder="Enter User ID..."
                    keyboardType="numeric"
                />
            }
        />
    );
};

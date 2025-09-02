import { FormRow, FormText, FormSwitch, Modal, TextInput } from 'enmity/components';
import { SettingsStore } from 'enmity/api/settings';
import { React } from 'enmity/metro/common';
import { useState } from 'react';

interface SettingsProps {
    settings: SettingsStore;
}

export default ({ settings }: SettingsProps) => {
    // State to manage the visibility of the input modal.
    const [isModalOpen, setIsModalOpen] = useState(false);
    // State to manage the text input value locally.
    const [idInput, setIdInput] = useState(settings.get('targetId', ''));

    // Function to handle saving the ID from the modal.
    const handleSave = () => {
        // Save the new ID to the plugin's settings store.
        settings.set('targetId', idInput);
        setIsModalOpen(false);
    };

    return (
        <React.Fragment>
            <FormRow
                label="Target User ID"
                subLabel="Tap to set the Discord ID of the user whose name you want to use."
                onPress={() => setIsModalOpen(true)}
                trailing={<FormText>{idInput || 'None'}</FormText>}
            />
            {/* The modal that will appear when the form row is tapped */}
            <Modal
                title="Enter Discord User ID"
                isVisible={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                style="full"
            >
                <TextInput
                    value={idInput}
                    onChangeText={setIdInput}
                    placeholder="Enter User ID..."
                    keyboardType="numeric"
                />
            </Modal>
        </React.Fragment>
    );
};

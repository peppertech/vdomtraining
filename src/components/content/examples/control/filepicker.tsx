import { h } from "preact";
import { useState, useCallback } from "preact/hooks";
import "ojs/ojfilepicker";

interface FileDetails {
	name: string;
	size: number;
	type: string;
}

interface FilePickerProps {
	onFileSelect: (files: FileDetails[]) => void;
	onInvalidFileSelect: (message: string) => void;
}

const FilePicker = ({ onFileSelect, onInvalidFileSelect }: FilePickerProps) => {
	const [accept, setAccept] = useState<string[]>(["image/*"]);
	const [selectionMode, setSelectionMode] = useState<"single" | "multiple">(
		"multiple"
	);
	const [disabled, setDisabled] = useState<boolean>(false);
	const [selectedFiles, setSelectedFiles] = useState<FileDetails[]>([]); // State for storing file details

	const selectListener = useCallback(
		(event: CustomEvent<{ files: File[] }>) => {
			const files = event.detail.files;
			const fileDetails = files.map((file) => ({
				name: file.name,
				size: file.size,
				type: file.type,
			}));
			setSelectedFiles(fileDetails); // Update state with file details
			onFileSelect(fileDetails);
		},
		[onFileSelect]
	);

	const invalidSelectListener = useCallback(
		(
			event: CustomEvent<{
				messages: Array<{ severity: string; summary: string }>;
			}>
		) => {
			const message = event.detail.messages
				.map((msg) => `${msg.severity}: ${msg.summary}`)
				.join(", ");
			onInvalidFileSelect(message);
		},
		[onInvalidFileSelect]
	);

	return (
		<>
			<oj-file-picker
				accept={accept}
				selection-mode={selectionMode}
				on-oj-select={selectListener}
				disabled={disabled}
				on-oj-invalid-select={invalidSelectListener}
			></oj-file-picker>
			<div>
				{/* Display selected file details */}
				{selectedFiles.length > 0 && (
					<ul>
						{selectedFiles.map((file, index) => (
							<li key={index}>
								{file.name} ({file.type}), Size: {file.size} bytes
							</li>
						))}
					</ul>
				)}
			</div>
		</>
	);
};

export default FilePicker;

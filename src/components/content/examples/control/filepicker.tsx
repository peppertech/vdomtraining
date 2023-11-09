import { h } from "preact";
import { useState, useCallback } from "preact/hooks";
import "ojs/ojfilepicker";

interface FilePickerProps {
	onFileSelect: (fileNames: string[]) => void;
	onInvalidFileSelect: (message: string) => void;
}

interface FilePickerSelectEventDetail {
	files: File[];
}

interface FilePickerInvalidSelectEventDetail {
	messages: Array<{ severity: string; summary: string }>;
}

const FilePicker = ({ onFileSelect, onInvalidFileSelect }: FilePickerProps) => {
	const [accept, setAccept] = useState<string[]>([
		".csv",
		"application/vnd.ms-excel",
		"text/csv",
		"text/comma-separated-values",
	]);
	const [selectionMode, setSelectionMode] = useState<"single" | "multiple">(
		"multiple"
	);
	const [disabled, setDisabled] = useState<boolean>(false);

	const selectListener = useCallback(
		(event: CustomEvent<FilePickerSelectEventDetail>) => {
			const files = event.detail.files;
			const fileNames = files.map((file) => file.name);
			onFileSelect(fileNames);
		},
		[onFileSelect]
	);

	const invalidSelectListener = useCallback(
		(event: CustomEvent<FilePickerInvalidSelectEventDetail>) => {
			const message = event.detail.messages
				.map((msg) => `${msg.severity}: ${msg.summary}`)
				.join(", ");
			onInvalidFileSelect(message);
		},
		[onInvalidFileSelect]
	);

	return (
		<oj-file-picker
			accept={accept}
			selection-mode={selectionMode}
			on-oj-select={selectListener}
			disabled={disabled}
			on-oj-invalid-select={invalidSelectListener}
		></oj-file-picker>
	);
};

export default FilePicker;

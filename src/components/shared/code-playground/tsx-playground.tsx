import "css!./tsx-playground.css";
import "oj-c/button";
import "oj-c/tab-bar";
import "ojs/ojswitch";
import type { TabData } from "oj-c/tab-bar";
import monaco from "./monaco";
import * as preact from "preact";
import type { ComponentChildren, ComponentProps } from "preact";
import * as hooks from "preact/hooks";
import * as typescript from "typescript";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { PlaygroundControls } from "./playground-controls";

const ALLOWED_IMPORTS = new Set([
  "preact",
  "preact/hooks",
  "oj-c/input-text",
  "oj-c/form-layout",
  "oj-c/button",
  "oj-c/select-single",
  "ojs/ojbutton",
  "ojs/ojdatetimepicker",
  "ojs/ojformlayout",
  "ojs/ojinputnumber",
  "ojs/ojinputtext",
  "ojs/ojlabel",
  "ojs/ojlabelvalue",
  "ojs/ojoption",
  "ojs/ojradioset",
  "./inputTextCorePack-shared",
  "./inputTextLegacy-shared",
  "./selectSingle-shared",
]);

export type PlaygroundSupportingFile = Readonly<{
  fileName: string;
  initialSource: string;
  language: "css" | "json" | "text";
  importSpecifier: string;
  bindingName?: string;
}>;

export type PlaygroundConfig = Readonly<{
  initialSource: string;
  fileName: string;
  runtimeBindings?: Record<string, unknown>;
  supportingFiles?: readonly PlaygroundSupportingFile[];
}>;

type PlaygroundFile = Readonly<{
  fileName: string;
  initialSource: string;
  language: "tsx" | PlaygroundSupportingFile["language"];
  importSpecifier?: string;
  bindingName?: string;
}>;

type PlaygroundTab = TabData<string>;
type TabSelectionChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-tab-bar">["onselectionChanged"]>
>[0];

const EMPTY_SUPPORTING_FILES: readonly PlaygroundSupportingFile[] = [];
const EMPTY_RUNTIME_BINDINGS: Record<string, unknown> = {};
const INFO_TAB_ID = "__tsx_playground_info__";

let codeThemesConfigured = false;
let jetTsxLanguageConfigured = false;
let supportingFileLanguagesConfigured = false;

function configureJetTsxLanguage() {
  if (jetTsxLanguageConfigured) {
    return;
  }

  const languageId = "jet-tsx";
  monaco.languages.register({ id: languageId, extensions: [".tsx"] });
  monaco.languages.setLanguageConfiguration(languageId, {
    brackets: [["{", "}"], ["[", "]"], ["(", ")"]],
    autoClosingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
    ],
  });
  monaco.languages.setMonarchTokensProvider(languageId, {
    keywords: [
      "as", "const", "export", "from", "function", "import", "return",
      "type", "interface", "let", "readonly", "true", "false", "null",
    ],
    tokenizer: {
      root: [
        [/\/\/.*$/, "comment"],
        [/\/\*/, { token: "comment", next: "@comment" }],
        [/<\/?[A-Za-z][\w:.-]*/, { token: "tag", next: "@jsxTag" }],
        [/[A-Z][\w$]*/, "type"],
        [/[a-z_$][\w$]*/, { cases: { "@keywords": "keyword", "@default": "identifier" } }],
        [/\d+(?:\.\d+)?/, "number"],
        [/"/, { token: "string.quote", next: "@doubleQuotedString" }],
        [/'/, { token: "string.quote", next: "@singleQuotedString" }],
        [/[{}()[\]]/, "delimiter.bracket"],
      ],
      jsxTag: [
        [/\/>/, { token: "tag", next: "@pop" }],
        [/>/, { token: "tag", next: "@pop" }],
        [/[A-Za-z_:][\w:.-]*/, "attribute.name"],
        [/=/, "delimiter"],
        [/"/, { token: "string.quote", next: "@doubleQuotedString" }],
        [/'/, { token: "string.quote", next: "@singleQuotedString" }],
        [/{/, { token: "delimiter.bracket", next: "@tsxExpression" }],
      ],
      tsxExpression: [
        [/}/, { token: "delimiter.bracket", next: "@pop" }],
        { include: "@root" },
      ],
      doubleQuotedString: [
        [/[^\\"]+/, "string"],
        [/\\./, "string.escape"],
        [/"/, { token: "string.quote", next: "@pop" }],
      ],
      singleQuotedString: [
        [/[^\\']+/, "string"],
        [/\\./, "string.escape"],
        [/'/, { token: "string.quote", next: "@pop" }],
      ],
      comment: [
        [/[^*]+/, "comment"],
        [/\*\//, { token: "comment", next: "@pop" }],
        [/./, "comment"],
      ],
    },
  });
  jetTsxLanguageConfigured = true;
}

function configureSupportingFileLanguages() {
  if (supportingFileLanguagesConfigured) {
    return;
  }

  monaco.languages.register({ id: "jet-css", extensions: [".css"] });
  monaco.languages.setMonarchTokensProvider("jet-css", {
    tokenizer: {
      root: [
        [/\/\*/, { token: "comment", next: "@comment" }],
        [/@[\w-]+/, "keyword"],
        [/[.#]?[A-Za-z_][\w-]*/, "css.selector"],
        [/[A-Za-z-]+(?=\s*:)/, "css.property"],
        [/#[0-9A-Fa-f]{3,8}\b/, "number"],
        [/\d+(?:\.\d+)?(?:px|em|rem|%|vh|vw|s|deg)?/, "number"],
        [/"/, { token: "string.quote", next: "@doubleQuotedString" }],
        [/'/, { token: "string.quote", next: "@singleQuotedString" }],
        [/[{}:;,]/, "delimiter"],
      ],
      doubleQuotedString: [
        [/[^\\"]+/, "string"],
        [/\\./, "string.escape"],
        [/"/, { token: "string.quote", next: "@pop" }],
      ],
      singleQuotedString: [
        [/[^\\']+/, "string"],
        [/\\./, "string.escape"],
        [/'/, { token: "string.quote", next: "@pop" }],
      ],
      comment: [
        [/[^*]+/, "comment"],
        [/\*\//, { token: "comment", next: "@pop" }],
        [/./, "comment"],
      ],
    },
  });

  monaco.languages.register({ id: "jet-json", extensions: [".json"] });
  monaco.languages.setMonarchTokensProvider("jet-json", {
    tokenizer: {
      root: [
        [/\/\/.+$/, "comment"],
        [/\/\*/, { token: "comment", next: "@comment" }],
        [/"(?:\\.|[^"\\])*"(?=\s*:)/, "json.key"],
        [/"(?:\\.|[^"\\])*"/, "string"],
        [/-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/, "number"],
        [/\b(?:true|false|null)\b/, "keyword"],
        [/[{}\[\],:]/, "delimiter"],
      ],
      comment: [
        [/[^*]+/, "comment"],
        [/\*\//, { token: "comment", next: "@pop" }],
        [/./, "comment"],
      ],
    },
  });
  supportingFileLanguagesConfigured = true;
}

function configureCodeThemes() {
  if (codeThemesConfigured) {
    return;
  }

  monaco.editor.defineTheme("jet-tsx-light", {
    base: "vs",
    inherit: true,
    rules: [
      { token: "comment", foreground: "6A737D", fontStyle: "italic" },
      { token: "keyword", foreground: "7F3FBF" },
      { token: "string", foreground: "A31515" },
      { token: "number", foreground: "098658" },
      { token: "tag", foreground: "800000" },
      { token: "tag.html", foreground: "800000" },
      { token: "delimiter.html", foreground: "800000" },
      { token: "attribute.name", foreground: "E36209" },
      { token: "attribute.name.html", foreground: "E36209" },
      { token: "attribute.value", foreground: "032F62" },
      { token: "attribute.value.html", foreground: "032F62" },
      { token: "css.selector", foreground: "800000" },
      { token: "css.property", foreground: "005CC5" },
      { token: "json.key", foreground: "005CC5" },
    ],
    colors: {
      "editor.background": "#FFFFFF",
      "editor.foreground": "#24292F",
    },
  });
  monaco.editor.defineTheme("jet-tsx-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "8B949E", fontStyle: "italic" },
      { token: "keyword", foreground: "FF7B72" },
      { token: "string", foreground: "A5D6FF" },
      { token: "number", foreground: "79C0FF" },
      { token: "tag", foreground: "7EE787" },
      { token: "tag.html", foreground: "7EE787" },
      { token: "delimiter.html", foreground: "7EE787" },
      { token: "attribute.name", foreground: "79C0FF" },
      { token: "attribute.name.html", foreground: "79C0FF" },
      { token: "attribute.value", foreground: "A5D6FF" },
      { token: "attribute.value.html", foreground: "A5D6FF" },
      { token: "css.selector", foreground: "7EE787" },
      { token: "css.property", foreground: "79C0FF" },
      { token: "json.key", foreground: "79C0FF" },
    ],
    colors: {
      "editor.background": "#0D1117",
      "editor.foreground": "#C9D1D9",
    },
  });
  codeThemesConfigured = true;
}

function getImportError(
  source: string,
  supportingFiles: readonly PlaygroundSupportingFile[],
) {
  for (const file of supportingFiles) {
    if (file.language === "css" && file.bindingName) {
      return `The CSS file ${file.fileName} must not declare a runtime binding.`;
    }
    if (file.language !== "css" && !file.bindingName) {
      return `The data file ${file.fileName} needs a runtime binding name.`;
    }
  }

  const allowedImports = new Set([
    ...ALLOWED_IMPORTS,
    ...supportingFiles.map((file) => file.importSpecifier),
  ]);
  const imports = source.matchAll(/import(?:[\s\S]*?from\s*)?["']([^"']+)["'];?/g);
  for (const match of imports) {
    if (!allowedImports.has(match[1])) {
      return `The import "${match[1]}" is not available in this playground.`;
    }
  }
  return undefined;
}

function getSupportingRuntimeBindings(
  supportingFiles: readonly PlaygroundSupportingFile[],
  sources: Record<string, string>,
) {
  return supportingFiles.reduce<Record<string, string>>((bindings, file) => {
    const source = sources[file.fileName] ?? file.initialSource;
    if (file.language === "json") {
      try {
        JSON.parse(source);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Invalid JSON.";
        throw new Error(`${file.fileName}: ${message}`);
      }
    }
    if (file.bindingName) {
      bindings[file.bindingName] = source;
    }
    return bindings;
  }, {});
}

function compileComponent(
  source: string,
  runtimeBindings: Record<string, unknown>,
  supportingFiles: readonly PlaygroundSupportingFile[],
  sources: Record<string, string>,
) {
  const importError = getImportError(source, supportingFiles);
  if (importError) {
    throw new Error(importError);
  }

  const componentMatch = source.match(
    /export\s+default\s+function\s+([A-Za-z_$][\w$]*)\s*\(/,
  );
  if (!componentMatch) {
    throw new Error("Export a named default function component to run this example.");
  }

  const executableSource = source
    .replace(/import[\s\S]*?;\s*/g, "")
    .replace("export default function", "function");
  const result = typescript.transpileModule(executableSource, {
    compilerOptions: {
      target: typescript.ScriptTarget.ES2020,
      module: typescript.ModuleKind.None,
      jsx: typescript.JsxEmit.React,
      jsxFactory: "h",
      jsxFragmentFactory: "Fragment",
      strict: true,
    },
    reportDiagnostics: true,
  });
  const errors = (result.diagnostics ?? []).filter(
    (diagnostic) => diagnostic.category === typescript.DiagnosticCategory.Error,
  );
  if (errors.length) {
    throw new Error(
      typescript.flattenDiagnosticMessageText(errors[0].messageText, "\n"),
    );
  }

  const bindings = {
    ...runtimeBindings,
    ...getSupportingRuntimeBindings(supportingFiles, sources),
  };
  const createComponent = new Function(
    "h",
    "Fragment",
    "useState",
    "useEffect",
    "useMemo",
    "useCallback",
    "useRef",
    ...Object.keys(bindings),
    `"use strict";\n${result.outputText}\nreturn ${componentMatch[1]};`,
  );
  return createComponent(
    preact.h,
    preact.Fragment,
    hooks.useState,
    hooks.useEffect,
    hooks.useMemo,
    hooks.useCallback,
    hooks.useRef,
    ...Object.values(bindings),
  ) as preact.FunctionComponent;
}

function getMonacoLanguage(file: PlaygroundFile) {
  switch (file.language) {
    case "css":
      return "jet-css";
    case "json":
      return "jet-json";
    case "text":
      return "plaintext";
    default:
      return "jet-tsx";
  }
}

function getFileTabLabel(file: PlaygroundFile) {
  const extension = file.fileName.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "tsx":
      return "TSX";
    case "json":
      return "JSON";
    case "css":
      return "CSS";
    default:
      return file.language === "text" ? "TEXT" : file.language.toUpperCase();
  }
}

type Props = Readonly<
  PlaygroundConfig & {
    ariaLabel: string;
    cssScope: string;
    infoContent?: ComponentChildren;
    onComponentChange: (component: preact.FunctionComponent | undefined) => void;
  }
>;

export function TsxPlayground({
  ariaLabel,
  initialSource,
  fileName,
  runtimeBindings = EMPTY_RUNTIME_BINDINGS,
  supportingFiles = EMPTY_SUPPORTING_FILES,
  cssScope,
  infoContent,
  onComponentChange,
}: Props) {
  const editorHostRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);
  const modelsRef = useRef(new Map<string, any>());
  const styleRef = useRef<HTMLStyleElement>();
  const [error, setError] = useState<string>();
  const [editorReady, setEditorReady] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const files = useMemo<PlaygroundFile[]>(
    () => [
      { fileName, initialSource, language: "tsx" },
      ...supportingFiles,
    ],
    [fileName, initialSource, supportingFiles],
  );
  const hasInfoTab = infoContent != null;
  const [activeFileName, setActiveFileName] = useState(
    hasInfoTab ? INFO_TAB_ID : fileName,
  );
  const [sources, setSources] = useState<Record<string, string>>(() =>
    Object.fromEntries(files.map((file) => [file.fileName, file.initialSource])),
  );
  const sourcesRef = useRef(sources);
  const isInfoTab = activeFileName === INFO_TAB_ID;
  const tabs = useMemo<PlaygroundTab[]>(
    () => [
      ...(hasInfoTab ? [{ itemKey: INFO_TAB_ID, label: "Info" }] : []),
      ...files.map((file) => ({
        itemKey: file.fileName,
        label: getFileTabLabel(file),
      })),
    ],
    [files, hasInfoTab],
  );

  const clearAppliedCss = () => {
    styleRef.current?.remove();
    styleRef.current = undefined;
  };

  const applyCss = (currentSources: Record<string, string>) => {
    const styles = supportingFiles
      .filter((file) => file.language === "css")
      .map(
        (file) =>
          `@scope ([data-tsx-playground-scope="${cssScope}"]) {\n${currentSources[file.fileName] ?? file.initialSource}\n}`,
      )
      .join("\n\n");
    if (!styles) {
      clearAppliedCss();
      return;
    }

    const style = styleRef.current ?? document.createElement("style");
    style.dataset.tsxPlaygroundScope = cssScope;
    style.textContent = styles;
    if (!style.parentElement) {
      document.head.append(style);
    }
    styleRef.current = style;
  };

  const applySources = (
    currentSources: Record<string, string>,
    applyStyles: boolean,
  ) => {
    try {
      const component = compileComponent(
        currentSources[fileName] ?? initialSource,
        runtimeBindings,
        supportingFiles,
        currentSources,
      );
      onComponentChange(component);
      if (applyStyles) {
        applyCss(currentSources);
      }
      setError(undefined);
    } catch (caughtError) {
      onComponentChange(undefined);
      clearAppliedCss();
      setError(
        caughtError instanceof Error ? caughtError.message : "Unable to apply the example.",
      );
    }
  };

  useEffect(() => {
    const initialSources = Object.fromEntries(
      files.map((file) => [file.fileName, file.initialSource]),
    );
    sourcesRef.current = initialSources;
    setSources(initialSources);
    setActiveFileName(hasInfoTab ? INFO_TAB_ID : fileName);

    try {
      configureCodeThemes();
      configureJetTsxLanguage();
      configureSupportingFileLanguages();
      const models = new Map<string, any>();
      const changeDisposables: Array<{ dispose: () => void }> = [];
      for (const file of files) {
        const model = monaco.editor.createModel(
          file.initialSource,
          getMonacoLanguage(file),
          monaco.Uri.parse(`inmemory://${cssScope}/${file.fileName}`),
        );
        models.set(file.fileName, model);
        changeDisposables.push(
          model.onDidChangeContent(() => {
            const nextSources = {
              ...sourcesRef.current,
              [file.fileName]: model.getValue(),
            };
            sourcesRef.current = nextSources;
            setSources(nextSources);
          }),
        );
      }
      modelsRef.current = models;
      const editor = monaco.editor.create(editorHostRef.current!, {
        model: models.get(fileName),
        automaticLayout: true,
        ariaLabel,
        readOnly: false,
        domReadOnly: false,
        minimap: { enabled: false },
        fontSize: 13,
        lineNumbers: "on",
        scrollBeyondLastLine: false,
        wordWrap: "on",
        semanticHighlighting: { enabled: true },
      });
      editorRef.current = editor;
      setEditorReady(true);
      applySources(initialSources, false);

      return () => {
        changeDisposables.forEach((disposable) => disposable.dispose());
        editor.dispose();
        models.forEach((model) => model.dispose());
        modelsRef.current = new Map();
        editorRef.current = null;
        clearAppliedCss();
        setEditorReady(false);
      };
    } catch (caughtError) {
      onComponentChange(undefined);
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Code editor could not be initialized.",
      );
    }
  }, [ariaLabel, cssScope, fileName, files, hasInfoTab, initialSource, onComponentChange, runtimeBindings, supportingFiles]);

  useEffect(() => {
    configureCodeThemes();
    monaco.editor.setTheme(isDarkMode ? "jet-tsx-dark" : "jet-tsx-light");
  }, [isDarkMode]);

  useEffect(() => {
    if (!isInfoTab) {
      editorRef.current?.layout();
    }
  }, [isInfoTab]);

  const switchFile = (event: TabSelectionChangedEvent) => {
    const nextFileName = event.detail.value as string;
    if (nextFileName === INFO_TAB_ID) {
      setActiveFileName(INFO_TAB_ID);
      return;
    }
    const nextModel = modelsRef.current.get(nextFileName);
    if (!nextModel) {
      return;
    }
    editorRef.current?.setModel(nextModel);
    setActiveFileName(nextFileName);
  };

  const getCurrentSources = () =>
    Object.fromEntries(
      files.map((file) => [
        file.fileName,
        modelsRef.current.get(file.fileName)?.getValue() ??
          sourcesRef.current[file.fileName] ??
          file.initialSource,
      ]),
    );
  const run = () => {
    const currentSources = getCurrentSources();
    sourcesRef.current = currentSources;
    setSources(currentSources);
    applySources(currentSources, true);
  };
  const reset = () => {
    const initialSources = Object.fromEntries(
      files.map((file) => [file.fileName, file.initialSource]),
    );
    modelsRef.current.forEach((model, currentFileName) => {
      model.setValue(initialSources[currentFileName]);
    });
    sourcesRef.current = initialSources;
    setSources(initialSources);
    applySources(initialSources, true);
  };
  const updateFallbackSource = (value: string) => {
    const model = modelsRef.current.get(activeFileName);
    if (model) {
      model.setValue(value);
      return;
    }
    const nextSources = { ...sourcesRef.current, [activeFileName]: value };
    sourcesRef.current = nextSources;
    setSources(nextSources);
  };

  return (
    <section
      class={`tsx-playground ${isDarkMode ? "tsx-playground--dark" : ""}`}
      aria-label="Edit the source, then apply it to the example above. This runs trusted code in this page."
    >
      <div class="tsx-playground__toolbar">
        <h2 class="oj-typography-heading-sm">Try it</h2>
        <PlaygroundControls
          disabled={isInfoTab}
          isDarkMode={isDarkMode}
          onDarkModeChange={setIsDarkMode}
          onApply={run}
          onReset={reset}
        />
      </div>
      <div class="tsx-playground__tabs">
        <oj-c-tab-bar
          aria-label="Editable recipe files"
          data={tabs}
          selection={activeFileName}
          edge="top"
          display="standard"
          layout="condense"
          overflow="popup"
          onselectionChanged={switchFile}
        ></oj-c-tab-bar>
      </div>
      <label
        class="tsx-playground__file-name"
        for={`${activeFileName}-editor`}
        hidden={isInfoTab}
      >
        {activeFileName}
      </label>
      <div
        class="tsx-playground__editor"
        ref={editorHostRef}
        aria-hidden={!editorReady}
        hidden={isInfoTab}
      ></div>
      {!editorReady && !isInfoTab && (
        <textarea
          id={`${activeFileName}-editor`}
          class="tsx-playground__editor-fallback"
          aria-label={`${ariaLabel}: ${activeFileName}`}
          value={sources[activeFileName] ?? ""}
          spellcheck={false}
          onInput={(event) => updateFallbackSource(event.currentTarget.value)}
        ></textarea>
      )}
      {isInfoTab ? (
        <section
          class="tsx-playground__info oj-typography-body-md"
          aria-label="Recipe information"
        >
          {infoContent}
        </section>
      ) : (
        error && <pre class="tsx-playground__error" role="alert">{error}</pre>
      )}
    </section>
  );
}

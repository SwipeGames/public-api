/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React, { useState, useEffect, type JSX } from "react";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import ApiCodeBlock from "@theme/ApiExplorer/ApiCodeBlock";
import buildPostmanRequest from "@theme/ApiExplorer/buildPostmanRequest";
import CodeTabs from "@theme/ApiExplorer/CodeTabs";
import { useTypedSelector } from "@theme/ApiItem/hooks";
import cloneDeep from "lodash/cloneDeep";
import codegen from "postman-code-generators";
import sdk from "postman-collection";

import { CodeSample, Language } from "./code-snippets-types";
import {
  getCodeSampleSourceFromLanguage,
  mergeArraysbyLanguage,
  mergeCodeSampleLanguage,
  generateLanguageSet,
} from "./languages";

export const languageSet: Language[] = generateLanguageSet();

export interface Props {
  postman: sdk.Request;
  codeSamples: CodeSample[];
}

function CodeTab({ children, hidden, className }: any): JSX.Element {
  return (
    <div role="tabpanel" className={className} {...{ hidden }}>
      {children}
    </div>
  );
}

function CodeSnippets({ postman, codeSamples }: Props) {
  const { siteConfig } = useDocusaurusContext();

  const contentType = useTypedSelector((state: any) => state.contentType.value);
  const accept = useTypedSelector((state: any) => state.accept.value);
  const server = useTypedSelector((state: any) => state.server.value);
  const body = useTypedSelector((state: any) => state.body);

  const pathParams = useTypedSelector((state: any) => state.params.path);
  const queryParams = useTypedSelector((state: any) => state.params.query);
  const cookieParams = useTypedSelector((state: any) => state.params.cookie);
  const headerParams = useTypedSelector((state: any) => state.params.header);

  const auth = useTypedSelector((state: any) => state.auth);
  const clonedAuth = cloneDeep(auth);
  let placeholder: string;

  // Helper function to sort object keys recursively
  function sortObjectKeys(obj: any): any {
    if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
      return obj;
    }
    const sorted: any = {};
    Object.keys(obj).sort().forEach(key => {
      sorted[key] = sortObjectKeys(obj[key]);
    });
    return sorted;
  }

  // Post-process generated code snippets for canonical JSON
  function postProcessSnippet(snippet: string, language: string): string {
    try {
      // For Python: add sort_keys=True to json.dumps()
      if (language === 'python' && snippet.includes('json.dumps(')) {
        snippet = snippet.replace(
          /json\.dumps\(([^)]+)\)(?!\s*,\s*sort_keys)/g,
          'json.dumps($1, sort_keys=True)'
        );
      }

      // For cURL: compact JSON in -d parameter
      if (language === 'curl' && snippet.includes('-d')) {
        const jsonMatch = snippet.match(/-d\s+'(\{[\s\S]*?\})'/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[1]);
          const compact = JSON.stringify(sortObjectKeys(parsed));
          snippet = snippet.replace(jsonMatch[1], compact);
        }
      }

      // For C#: compact JSON in StringContent
      if (language === 'csharp' && snippet.includes('StringContent')) {
        const jsonMatch = snippet.match(/new StringContent\("(\{[\s\S]*?\})"/);
        if (jsonMatch) {
          // Unescape the JSON string first
          const unescaped = jsonMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
          const parsed = JSON.parse(unescaped);
          const compact = JSON.stringify(sortObjectKeys(parsed));
          // Escape for C# string
          const escaped = compact.replace(/"/g, '\\"');
          snippet = snippet.replace(jsonMatch[1], escaped);
        }
      }

      // For Go: compact JSON in strings.NewReader
      if (language === 'go' && snippet.includes('strings.NewReader')) {
        const jsonMatch = snippet.match(/strings\.NewReader\(`(\{[\s\S]*?\})`\)/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[1]);
          const compact = JSON.stringify(sortObjectKeys(parsed));
          snippet = snippet.replace(jsonMatch[1], compact);
        }
      }

      // For Ruby: add sort_keys: true to JSON.dump
      if (language === 'ruby' && snippet.includes('JSON.dump')) {
        snippet = snippet.replace(
          /JSON\.dump\((\{[\s\S]*?\})\)(?!\s*,\s*sort_keys)/,
          'JSON.dump($1, { sort_keys: true })'
        );
      }

      // For PHP: compact JSON in CURLOPT_POSTFIELDS
      if (language === 'php' && snippet.includes('CURLOPT_POSTFIELDS')) {
        const jsonMatch = snippet.match(/CURLOPT_POSTFIELDS\s*=>\s*'(\{[\s\S]*?\n\})'/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[1]);
          const compact = JSON.stringify(sortObjectKeys(parsed));
          snippet = snippet.replace(jsonMatch[1], compact);
        }
      }

      // For Java: compact JSON in RequestBody.create
      if (language === 'java' && snippet.includes('RequestBody.create')) {
        const jsonMatch = snippet.match(/RequestBody\.create\([^,]+,\s*"(\{[\s\S]*?\})"\)/);
        if (jsonMatch) {
          // Unescape the JSON string first
          const unescaped = jsonMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
          const parsed = JSON.parse(unescaped);
          const compact = JSON.stringify(sortObjectKeys(parsed));
          // Escape for Java string
          const escaped = compact.replace(/"/g, '\\"');
          snippet = snippet.replace(jsonMatch[1], escaped);
        }
      }

      // For PowerShell: compact JSON in here-string
      if (language === 'powershell' && snippet.includes('$body = @"')) {
        const jsonMatch = snippet.match(/\$body = @"\s*(\{[\s\S]*?\})\s*"@/);
        if (jsonMatch) {
          // Remove backtick escaping, parse, compact, re-escape
          const unescaped = jsonMatch[1].replace(/`"/g, '"');
          const parsed = JSON.parse(unescaped);
          const compact = JSON.stringify(sortObjectKeys(parsed));
          // Escape quotes with backticks for PowerShell
          const escaped = compact.replace(/"/g, '`"');
          snippet = snippet.replace(jsonMatch[1], escaped);
        }
      }

      // For C: compact JSON in char* string
      if (language === 'c' && snippet.includes('const char *data')) {
        const jsonMatch = snippet.match(/const char \*data = "(\{[\s\S]*?\})";/);
        if (jsonMatch) {
          // Unescape the JSON string first
          const unescaped = jsonMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
          const parsed = JSON.parse(unescaped);
          const compact = JSON.stringify(sortObjectKeys(parsed));
          // Escape for C string
          const escaped = compact.replace(/"/g, '\\"');
          snippet = snippet.replace(jsonMatch[1], escaped);
        }
      }

      // For Objective-C: compact JSON in NSString
      if (language === 'objective-c' && snippet.includes('initWithData')) {
        const jsonMatch = snippet.match(/\[@"(\{[\s\S]*?\})" dataUsingEncoding/);
        if (jsonMatch) {
          // Unescape the JSON string first
          const unescaped = jsonMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
          const parsed = JSON.parse(unescaped);
          const compact = JSON.stringify(sortObjectKeys(parsed));
          // Escape for Objective-C string
          const escaped = compact.replace(/"/g, '\\"');
          snippet = snippet.replace(jsonMatch[1], escaped);
        }
      }

      // For OCaml: compact JSON in string ref
      if (language === 'ocaml' && snippet.includes('let postData = ref')) {
        const jsonMatch = snippet.match(/let postData = ref "(\{[\s\S]*?\})"/);
        if (jsonMatch) {
          const unescaped = jsonMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
          const parsed = JSON.parse(unescaped);
          const compact = JSON.stringify(sortObjectKeys(parsed));
          const escaped = compact.replace(/"/g, '\\"');
          snippet = snippet.replace(jsonMatch[1], escaped);
        }
      }

      // For R: compact JSON in string
      if (language === 'r' && snippet.includes("body = '")) {
        const jsonMatch = snippet.match(/body = '(\{[\s\S]*?\})'/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[1]);
          const compact = JSON.stringify(sortObjectKeys(parsed));
          snippet = snippet.replace(jsonMatch[1], compact);
        }
      }

      // For Swift: compact JSON in string
      if (language === 'swift' && snippet.includes('let parameters =')) {
        const jsonMatch = snippet.match(/let parameters = "(\{[\s\S]*?\})"/);
        if (jsonMatch) {
          const unescaped = jsonMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
          const parsed = JSON.parse(unescaped);
          const compact = JSON.stringify(sortObjectKeys(parsed));
          const escaped = compact.replace(/"/g, '\\"');
          snippet = snippet.replace(jsonMatch[1], escaped);
        }
      }

      // For Kotlin: compact JSON in string
      if (language === 'kotlin' && snippet.includes('.toRequestBody')) {
        const jsonMatch = snippet.match(/val body = "(\{[\s\S]*?\})".toRequestBody/);
        if (jsonMatch) {
          const unescaped = jsonMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
          const parsed = JSON.parse(unescaped);
          const compact = JSON.stringify(sortObjectKeys(parsed));
          const escaped = compact.replace(/"/g, '\\"');
          snippet = snippet.replace(jsonMatch[1], escaped);
        }
      }

      // For Rust: compact JSON in raw string
      if (language === 'rust' && snippet.includes('let data = r#')) {
        const jsonMatch = snippet.match(/let data = r#"(\{[\s\S]*?\})"#/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[1]);
          const compact = JSON.stringify(sortObjectKeys(parsed));
          snippet = snippet.replace(jsonMatch[1], compact);
        }
      }
    } catch (e) {
      // If processing fails, return original snippet
      console.warn('[Canonical JSON] Failed to post-process snippet:', e);
    }
    return snippet;
  }

  function cleanCredentials(obj: any) {
    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        // use name as placeholder if exists
        const comboAuthId = Object.keys(obj).join(" and ");
        const authOptions =
          clonedAuth?.options?.[key] ?? clonedAuth?.options?.[comboAuthId];
        placeholder = authOptions?.[0]?.name;
        obj[key] = cleanCredentials(obj[key]);
      } else {
        obj[key] = `<${placeholder ?? key}>`;
      }
    }

    return obj;
  }

  // scrub credentials from code snippets
  const cleanedAuth = {
    ...clonedAuth,
    data: cleanCredentials(clonedAuth.data),
  };

  // Create a Postman request object using cleanedAuth
  const cleanedPostmanRequest = buildPostmanRequest(postman, {
    queryParams,
    pathParams,
    cookieParams,
    contentType,
    accept,
    headerParams,
    body,
    server,
    auth: cleanedAuth,
  });

  // User-defined languages array
  // Can override languageSet, change order of langs, override options and variants
  const userDefinedLanguageSet =
    (siteConfig?.themeConfig?.languageTabs as Language[] | undefined) ??
    languageSet;

  // Filter languageSet by user-defined langs
  const filteredLanguageSet = languageSet.filter((ls) => {
    return userDefinedLanguageSet?.some((lang) => {
      return lang.language === ls.language;
    });
  });

  // Merge user-defined langs into languageSet
  const mergedLangs = mergeCodeSampleLanguage(
    mergeArraysbyLanguage(userDefinedLanguageSet, filteredLanguageSet),
    codeSamples
  );

  // Read defaultLang from localStorage
  const defaultLang: Language[] = mergedLangs.filter(
    (lang) =>
      lang.language === localStorage.getItem("docusaurus.tab.code-samples")
  );
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>();
  const [selectedSample, setSelectedSample] = useState<string | undefined>();
  const [language, setLanguage] = useState(() => {
    // Return first index if only 1 user-defined language exists
    if (mergedLangs.length === 1) {
      return mergedLangs[0];
    }
    // Fall back to language in localStorage or first user-defined language
    return defaultLang[0] ?? mergedLangs[0];
  });
  const [codeText, setCodeText] = useState<string>("");
  const [codeSampleCodeText, setCodeSampleCodeText] = useState<
    string | (() => string)
  >(() => getCodeSampleSourceFromLanguage(language));

  useEffect(() => {
    if (language && !!language.sample) {
      setCodeSampleCodeText(getCodeSampleSourceFromLanguage(language));
    }

    if (language && !!language.options) {
      codegen.convert(
        language.language,
        language.variant,
        cleanedPostmanRequest,
        language.options,
        (error: any, snippet: string) => {
          if (error) {
            return;
          }
          setCodeText(postProcessSnippet(snippet, language.language));
        }
      );
    } else if (language && !language.options) {
      const langSource = mergedLangs.filter(
        (lang) => lang.language === language.language
      );

      // Merges user-defined language with default languageSet
      // This allows users to define only the minimal properties necessary in languageTabs
      // User-defined properties should override languageSet properties
      const mergedLanguage = { ...langSource[0], ...language };
      codegen.convert(
        mergedLanguage.language,
        mergedLanguage.variant,
        cleanedPostmanRequest,
        mergedLanguage.options,
        (error: any, snippet: string) => {
          if (error) {
            return;
          }
          setCodeText(postProcessSnippet(snippet, mergedLanguage.language));
        }
      );
    } else {
      setCodeText("");
    }
  }, [
    accept,
    body,
    contentType,
    cookieParams,
    headerParams,
    language,
    pathParams,
    postman,
    queryParams,
    server,
    cleanedPostmanRequest,
    mergedLangs,
  ]);
  // no dependencies was intentionally set for this particular hook. it's safe as long as if conditions are set
  useEffect(function onSelectedVariantUpdate() {
    if (selectedVariant && selectedVariant !== language?.variant) {
      codegen.convert(
        language.language,
        selectedVariant,
        cleanedPostmanRequest,
        language.options,
        (error: any, snippet: string) => {
          if (error) {
            return;
          }
          setCodeText(postProcessSnippet(snippet, language.language));
        }
      );
    }
  });

  // no dependencies was intentionally set for this particular hook. it's safe as long as if conditions are set
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(function onSelectedSampleUpdate() {
    if (
      language &&
      language.samples &&
      language.samplesSources &&
      selectedSample &&
      selectedSample !== language.sample
    ) {
      const sampleIndex = language.samples.findIndex(
        (smp) => smp === selectedSample
      );
      setCodeSampleCodeText(language.samplesSources[sampleIndex]);
    }
  });

  if (language === undefined) {
    return null;
  }

  return (
    <>
      {/* Outer language tabs */}
      <CodeTabs
        groupId="code-samples"
        action={{
          setLanguage: setLanguage,
          setSelectedVariant: setSelectedVariant,
          setSelectedSample: setSelectedSample,
        }}
        languageSet={mergedLangs}
        defaultValue={defaultLang[0]?.language ?? mergedLangs[0].language}
        lazy
      >
        {mergedLangs.map((lang) => {
          return (
            <CodeTab
              value={lang.language}
              label={lang.language}
              key={lang.language}
              attributes={{
                className: `openapi-tabs__code-item--${lang.logoClass}`,
              }}
            >
              {/* Inner x-codeSamples tabs */}
              {lang.samples && (
                <CodeTabs
                  className="openapi-tabs__code-container-inner"
                  action={{
                    setLanguage: setLanguage,
                    setSelectedSample: setSelectedSample,
                  }}
                  includeSample={true}
                  currentLanguage={lang.language}
                  defaultValue={selectedSample}
                  languageSet={mergedLangs}
                  lazy
                >
                  {lang.samples.map((sample, index) => {
                    return (
                      <CodeTab
                        value={sample}
                        label={
                          lang.samplesLabels
                            ? lang.samplesLabels[index]
                            : sample
                        }
                        key={`${lang.language}-${lang.sample}`}
                        attributes={{
                          className: `openapi-tabs__code-item--sample`,
                        }}
                      >
                        {/* @ts-ignore */}
                        <ApiCodeBlock
                          language={lang.highlight}
                          className="openapi-explorer__code-block"
                          showLineNumbers={true}
                        >
                          {codeSampleCodeText}
                        </ApiCodeBlock>
                      </CodeTab>
                    );
                  })}
                </CodeTabs>
              )}

              {/* Inner generated code snippets */}
              <CodeTabs
                className="openapi-tabs__code-container-inner"
                action={{
                  setLanguage: setLanguage,
                  setSelectedVariant: setSelectedVariant,
                }}
                includeVariant={true}
                currentLanguage={lang.language}
                defaultValue={selectedVariant}
                languageSet={mergedLangs}
                lazy
              >
                {lang.variants.map((variant, index) => {
                  return (
                    <CodeTab
                      value={variant.toLowerCase()}
                      label={variant.toUpperCase()}
                      key={`${lang.language}-${lang.variant}`}
                      attributes={{
                        className: `openapi-tabs__code-item--variant`,
                      }}
                    >
                      {/* @ts-ignore */}
                      <ApiCodeBlock
                        language={lang.highlight}
                        className="openapi-explorer__code-block"
                        showLineNumbers={true}
                      >
                        {codeText}
                      </ApiCodeBlock>
                    </CodeTab>
                  );
                })}
              </CodeTabs>
            </CodeTab>
          );
        })}
      </CodeTabs>
    </>
  );
}

export default CodeSnippets;

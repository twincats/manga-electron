import type Electron from 'electron';
/* eslint-disable  @typescript-eslint/no-explicit-any */
const { shell, clipboard, ipcRenderer, dialog } = (window as any)
  .electron as typeof Electron;

const version = (window as any).version as NodeJS.ProcessVersions;

export function useShell() {
  return shell;
}

export function useClipboard() {
  return clipboard;
}

export function useIpc() {
  return ipcRenderer;
}

export function useDialog() {
  return dialog;
}

export function useVersion() {
  return version;
}

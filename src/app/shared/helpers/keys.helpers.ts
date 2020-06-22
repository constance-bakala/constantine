export function isMetaKey(e: KeyboardEvent) {
  if (e.metaKey || e.ctrlKey) {
    switch (e.key.toLocaleLowerCase()) {
      case 'c':
      case 'x':
      case 'a':
      case 'v':
        return true;
    }
  }

  switch (e.key) {
    case 'Backspace':
    case 'ArrowLeft':
    case 'ArrowRight':
    case 'ArrowUp':
    case 'ArrowDown':
    case 'Tab':
    case 'Enter':
    case '-':
    case 'Control':
      return true;
  }

  return false;
}

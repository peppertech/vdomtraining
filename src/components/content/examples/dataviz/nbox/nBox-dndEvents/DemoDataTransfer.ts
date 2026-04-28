export class DemoDataTransfer {
  private readonly data = new Map<string, string>();

  setData(type: string, value: string | null) {
    if (value === null) {
      this.data.delete(type);
      return;
    }

    this.data.set(type, value);
  }

  getData(type: string) {
    return this.data.get(type) ?? '';
  }

  clearData(type?: string) {
    if (type) {
      this.data.delete(type);
      return;
    }

    this.data.clear();
  }
}

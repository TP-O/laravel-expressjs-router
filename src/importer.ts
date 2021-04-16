export class Importer {
  /**
   * Import a method.
   *
   * @param input the thing will be imported.
   */
  public import(input: string | CallableFunction, dir?: string) {
    return typeof input === 'string'
      ? this.importWithString(input, dir)
      : this.importWithFunction(input);
  }

  /**
   * Import with string input.
   *
   * @param input string.
   */
  private importWithString(input: string, dir = '/') {
    const [file, method] = input.split('@');

    /* eslint-disable-next-line */
    const controller = require(`${dir}/${file}`).default;

    return controller[method];
  }

  /**
   * Import with callable function.
   *
   * @param input callable function.
   */
  private importWithFunction(input: CallableFunction) {
    return input;
  }
}

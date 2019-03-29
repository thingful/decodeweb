
export default new class zenroom {
  exec(script, opts) {
    let defaults = {
      verbosity: 1
    };

    let options = Object.assign({}, defaults, opts);

    // let script = 'print("hello world")';

    outputBuffer = '';
    Module.ccall(
      'zenroom_exec',
      'number',
      ['string', 'string', 'string', 'string', 'number'],
      [script, options.conf, options.keys, options.data, options.verbosity]
    )

    return outputBuffer;
  }
}
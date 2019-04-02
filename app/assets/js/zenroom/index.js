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

  generateKeypair(identifier) {
    let script = `ZEN:begin(0)

ZEN:parse([[
Scenario 'coconut': "To run over the mobile wallet the first time and store the output as keypair.keys"
  Given that I am known as '${identifier}'
  When I create my new keypair
  Then print all data
]])

ZEN:run()`;

    console.log(script);
    return this.exec(script);
  }
}
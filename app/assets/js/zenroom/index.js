export default new class zenroom {
  exec(script, opts) {
    let defaults = {
      verbosity: 1
    };

    let options = Object.assign({}, defaults, opts);

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
    let script = `
ZEN:begin(0)

ZEN:parse([[
Scenario 'coconut': "To run over the mobile wallet the first time and store the output as keypair.keys"
  Given that I am known as '${identifier}'
  When I create my new keypair
  Then print all data
]])

ZEN:run()`;

    return this.exec(script);
  }

  blindSignatureRequest(identifier, keypair) {
    let script = `
ZEN:begin(0)

ZEN:parse([[
Scenario 'coconut': "To run after the request keypair is stored (keypair.keys)"
  Given that I am known as '${identifier}'
  and I have my credential keypair
  When I request a blind signature of my keypair
  Then print all data
]])

ZEN:run()`

    //console.log("keypair.keys");
    //console.log(keypair);

    let blindSignature = this.exec(script, { keys: keypair });
    //console.log("blind_signature.req");
    //console.log(blindSignature);
    return JSON.parse(blindSignature);
  }

  createCredential(identifier, keypair, ciSignedCredential) {
    let script = `
ZEN:begin(0)

ZEN:parse([[
Scenario 'coconut': "To run by citizen and store the output as credential.json"
  Given that I am known as '${identifier}'
  and I have my credential keypair
  When I receive a credential signature 'issuer_identifier'
  and I aggregate the credential into my keyring
  Then print all data
]])

ZEN:run()`

    //console.log("ci_signed_credential.json");
    //console.log(JSON.stringify(ciSignedCredential));

    return this.exec(script, { keys: keypair, data: JSON.stringify(ciSignedCredential) });
  }

  createBlindproofCredential(identifier, credential, ciKeypair) {
    let script = `
ZEN:begin(0)

ZEN:parse([[
Scenario 'coconut': "To run by citizen and send the result blindproof_credential.json to the verifier/checker"
  Given that I am known as '${identifier}'
  and I have my credential keypair
  and I use the verification key by 'issuer_identifier'
  and I have a signed credential
  When I aggregate all the verification keys
  and I generate a credential proof
  Then print all data
]])

ZEN:run()`

    //console.log("credential.json")
    //console.log(credential);

    //console.log("ci_verify_keypair.keys")
    //console.log(ciKeypair);

    return this.exec(script, { keys: credential, data: ciKeypair });
  }
}
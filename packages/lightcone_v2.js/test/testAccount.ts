import assert = require("assert");
import ethereum from "../src/lib/wallet/ethereum";
import { Account } from "../src";
import { EdDSA } from "../src/lib/sign/eddsa";

describe("test account sign functions", function() {
  let pkAccount;
  this.timeout(1000);

  beforeEach(function() {
    pkAccount = ethereum.account.fromPrivateKey(
      "0x7c71142c72a019568cf848ac7b805d21f2e0fd8bc341e8314580de11c6a397bf"
    );
  });

  it("test sign submit withdrawal", function(done) {
    const account = new Account(pkAccount);
    const keyPair = EdDSA.generateKeyPair("random");
    const expected = {
      hash:
        "13447340968633292849744809768697639152007958543625205621754093851658339440411",
      Rx:
        "20724689164439364899811951535053096387655875062512277395403067123966729472896",
      Ry:
        "12064603129649318293203270337211327834026089320449986483258377348938645159770",
      s:
        "2481428860873269907943413163278165926509078391770619997899480798705895725490"
    };
    let signedWithdrawal = account.offchainWithdrawal(
      4,
      keyPair.publicKeyX,
      keyPair.publicKeyY,
      keyPair.secretKey,
      0,
      "LRC",
      "10",
      "LRC",
      "10"
    );
    assert.strictEqual(signedWithdrawal.hash, expected.hash);
    assert.strictEqual(signedWithdrawal.signature.Rx, expected.Rx);
    assert.strictEqual(signedWithdrawal.signature.Ry, expected.Ry);
    assert.strictEqual(signedWithdrawal.signature.s, expected.s);
    done();
  });

  it("test sign submit order", function(done) {
    const account = new Account(pkAccount);
    const keyPair = EdDSA.generateKeyPair("random");
    const expected = {
      Rx:
        "6073592097050814873731737817749622170390583424274322424418290055228687898486",
      Ry:
        "1033780540847765362040973214334501277637541782039011171375340799874150301045",
      s:
        "1980286804376671796856727591601895183849328963462001496056666795916073250"
    };
    let signedOrder = account.submitOrder(
      pkAccount.getAddress(),
      4,
      keyPair.publicKeyX,
      keyPair.publicKeyY,
      keyPair.secretKey,
      "LRC",
      "ETH",
      "10",
      "20",
      0,
      1562889050,
      1562924050
    );
    assert.strictEqual(signedOrder.signature.Rx, expected.Rx);
    assert.strictEqual(signedOrder.signature.Ry, expected.Ry);
    assert.strictEqual(signedOrder.signature.s, expected.s);
    done();
  });

  it("test sign cancel order", function(done) {
    const account = new Account(pkAccount);
    const keyPair = EdDSA.generateKeyPair("random");
    const expected = {
      Rx:
        "11450728918688016820553215815825916881781389940276091038770023763196392069150",
      Ry:
        "4423837911786020120772281474699328459829332054248426289504280074000802153211",
      s:
        "2665194773000010994846485928892358272762238072179344499076751740352865146978"
    };
    let signedOrder = account.submitCancel(
      4,
      keyPair.publicKeyX,
      keyPair.publicKeyY,
      keyPair.secretKey,
      1,
      "LRC",
      0,
      "ETH",
      "0.01"
    );
    assert.strictEqual(signedOrder.signature.Rx, expected.Rx);
    assert.strictEqual(signedOrder.signature.Ry, expected.Ry);
    assert.strictEqual(signedOrder.signature.s, expected.s);
    done();
  });

  it("test sign get API key", function(done) {
    const account = new Account(pkAccount);
    const keyPair = EdDSA.generateKeyPair("random");
    const expected = {
      Rx:
        "6717313863549279085066393349511992449362100318538198171271018296006351820823",
      Ry:
        "2027016126976973875700528022436790037848085570241630349087041983504660051098",
      s:
        "1550178689038019647824751372373321180664746373234329435725556320443028385655"
    };
    let signedOrder = account.getApiKey(
      4,
      keyPair.publicKeyX,
      keyPair.publicKeyY,
      keyPair.secretKey
    );
    assert.strictEqual(signedOrder.signature.Rx, expected.Rx);
    assert.strictEqual(signedOrder.signature.Ry, expected.Ry);
    assert.strictEqual(signedOrder.signature.s, expected.s);
    done();
  });

  it("test sign get DEX nonce", function(done) {
    const account = new Account(pkAccount);
    const keyPair = EdDSA.generateKeyPair("random");
    const expected = {
      Rx:
        "2572796599343858415159676118493638296628563332684854731866922938085591796991",
      Ry:
        "2072712850867329017575470422224929357095298128730138069517472805577507786107",
      s:
        "1896847225899030863906407511803214357943710736864780223404512462970636155755"
    };
    let signedOrder = account.getDexNonce(
      4,
      keyPair.publicKeyX,
      keyPair.publicKeyY,
      keyPair.secretKey
    );
    assert.strictEqual(signedOrder.signature.Rx, expected.Rx);
    assert.strictEqual(signedOrder.signature.Ry, expected.Ry);
    assert.strictEqual(signedOrder.signature.s, expected.s);
    done();
  });

  it("test sign get order ID", function(done) {
    const account = new Account(pkAccount);
    const keyPair = EdDSA.generateKeyPair("random");
    const expected = {
      Rx:
        "21375701218003200532229964128164169536004640129025202274924915266284156333303",
      Ry:
        "10345814635304250882917258988203007790902858210317607847780267135285149843608",
      s:
        "835810994075138215351491538127263792812382712347171289935475029413801004204"
    };
    let signedOrder = account.getOrderId(
      4,
      keyPair.publicKeyX,
      keyPair.publicKeyY,
      keyPair.secretKey,
      "LRC"
    );
    assert.strictEqual(signedOrder.signature.Rx, expected.Rx);
    assert.strictEqual(signedOrder.signature.Ry, expected.Ry);
    assert.strictEqual(signedOrder.signature.s, expected.s);
    done();
  });

  it("test sign get order detail", function(done) {
    const account = new Account(pkAccount);
    const keyPair = EdDSA.generateKeyPair("random");
    const expected = {
      Rx:
        "7175851741009828872043928215501845307819332961894616908423881710079769568937",
      Ry:
        "2113427980835241982701225194283093882876718604887819314900886720348576384483",
      s:
        "750769101859375463519140572710290049895346093353751218253611416375369410074"
    };
    let signedOrder = account.getOrderDetail(
      4,
      keyPair.publicKeyX,
      keyPair.publicKeyY,
      keyPair.secretKey,
      "3259542248112692944753336581445147695645642704960036187016566871776640460"
    );
    assert.strictEqual(signedOrder.signature.Rx, expected.Rx);
    assert.strictEqual(signedOrder.signature.Ry, expected.Ry);
    assert.strictEqual(signedOrder.signature.s, expected.s);
    done();
  });

  it("test sign get orders", function(done) {
    const account = new Account(pkAccount);
    const keyPair = EdDSA.generateKeyPair("random");
    const expected = {
      Rx:
        "2572796599343858415159676118493638296628563332684854731866922938085591796991",
      Ry:
        "2072712850867329017575470422224929357095298128730138069517472805577507786107",
      s:
        "1896847225899030863906407511803214357943710736864780223404512462970636155755"
    };
    let signedOrder = account.getOrders(
      4,
      keyPair.publicKeyX,
      keyPair.publicKeyY,
      keyPair.secretKey
    );
    assert.strictEqual(signedOrder.signature.Rx, expected.Rx);
    assert.strictEqual(signedOrder.signature.Ry, expected.Ry);
    assert.strictEqual(signedOrder.signature.s, expected.s);
    done();
  });

  it("test sign get user balance", function(done) {
    const account = new Account(pkAccount);
    const keyPair = EdDSA.generateKeyPair("random");
    const expected = {
      Rx:
        "2572796599343858415159676118493638296628563332684854731866922938085591796991",
      Ry:
        "2072712850867329017575470422224929357095298128730138069517472805577507786107",
      s:
        "1896847225899030863906407511803214357943710736864780223404512462970636155755"
    };
    let signedOrder = account.getUserBalance(
      4,
      keyPair.publicKeyX,
      keyPair.publicKeyY,
      keyPair.secretKey
    );
    assert.strictEqual(signedOrder.signature.Rx, expected.Rx);
    assert.strictEqual(signedOrder.signature.Ry, expected.Ry);
    assert.strictEqual(signedOrder.signature.s, expected.s);
    done();
  });

  it("test sign get user transactions", function(done) {
    const account = new Account(pkAccount);
    const keyPair = EdDSA.generateKeyPair("random");
    const expected = {
      Rx:
        "2572796599343858415159676118493638296628563332684854731866922938085591796991",
      Ry:
        "2072712850867329017575470422224929357095298128730138069517472805577507786107",
      s:
        "1896847225899030863906407511803214357943710736864780223404512462970636155755"
    };
    let signedOrder = account.getUserTransactions(
      4,
      keyPair.publicKeyX,
      keyPair.publicKeyY,
      keyPair.secretKey
    );
    assert.strictEqual(signedOrder.signature.Rx, expected.Rx);
    assert.strictEqual(signedOrder.signature.Ry, expected.Ry);
    assert.strictEqual(signedOrder.signature.s, expected.s);
    done();
  });

  it("test sign get user actions", function(done) {
    const account = new Account(pkAccount);
    const keyPair = EdDSA.generateKeyPair("random");
    const expected = {
      Rx:
        "2572796599343858415159676118493638296628563332684854731866922938085591796991",
      Ry:
        "2072712850867329017575470422224929357095298128730138069517472805577507786107",
      s:
        "1896847225899030863906407511803214357943710736864780223404512462970636155755"
    };
    let signedOrder = account.getUserActions(
      4,
      keyPair.publicKeyX,
      keyPair.publicKeyY,
      keyPair.secretKey
    );
    assert.strictEqual(signedOrder.signature.Rx, expected.Rx);
    assert.strictEqual(signedOrder.signature.Ry, expected.Ry);
    assert.strictEqual(signedOrder.signature.s, expected.s);
    done();
  });

  it("test sign get user trades", function(done) {
    const account = new Account(pkAccount);
    const keyPair = EdDSA.generateKeyPair("random");
    const expected = {
      Rx:
        "2572796599343858415159676118493638296628563332684854731866922938085591796991",
      Ry:
        "2072712850867329017575470422224929357095298128730138069517472805577507786107",
      s:
        "1896847225899030863906407511803214357943710736864780223404512462970636155755"
    };
    let signedOrder = account.getUserTrades(
      4,
      keyPair.publicKeyX,
      keyPair.publicKeyY,
      keyPair.secretKey
    );
    assert.strictEqual(signedOrder.signature.Rx, expected.Rx);
    assert.strictEqual(signedOrder.signature.Ry, expected.Ry);
    assert.strictEqual(signedOrder.signature.s, expected.s);
    done();
  });

  it("test sign get user fee rate", function(done) {
    const account = new Account(pkAccount);
    const keyPair = EdDSA.generateKeyPair("random");
    const expected = {
      Rx:
        "2572796599343858415159676118493638296628563332684854731866922938085591796991",
      Ry:
        "2072712850867329017575470422224929357095298128730138069517472805577507786107",
      s:
        "1896847225899030863906407511803214357943710736864780223404512462970636155755"
    };
    let signedOrder = account.getUserFeeRate(
      4,
      keyPair.publicKeyX,
      keyPair.publicKeyY,
      keyPair.secretKey
    );
    assert.strictEqual(signedOrder.signature.Rx, expected.Rx);
    assert.strictEqual(signedOrder.signature.Ry, expected.Ry);
    assert.strictEqual(signedOrder.signature.s, expected.s);
    done();
  });
});

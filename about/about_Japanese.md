![](https://nccoe.nist.gov/sites/all/themes/custom/nccoe2x/asset/img/NIST_logo.svg)

# NIST Uncertainty Machine


NIST Uncertainty Machineは，米国標準技術研究所 ([NIST](https://www.nist.gov)) が開発した，web上で稼動する不確かさ評価のためのソフトウェアツールです。このツールは，その値と不確かさがわかっている複数のスカラー入力量の既知の関数として表現できる一つもしくは複数の出力量の不確かさを評価することができます。


NIST Uncertainty Machineには，「測定における不確かさの表現のガイド」 (GUM) で提唱されている不確かさ評価の近似的方法と，GUM補完文書1および2に記載されているモンテカルロ法が実装されています。入力量と出力量は確率変数としてモデル化され，それらの確率分布によって不確かさが特徴づけられます。入力量の間に相関が存在する場合のため，NIST Uncertainty Machine は対応する相関を指定する方法，およびそれらを計算に取り込む方法を提供しています。


NIST Uncertainty Machineは次を出力します:

 * 出力量 (測定対象量)の推定値
 * それに付随する標準不確かさおよび拡張不確かさの値
 * 測定対象量の真値の包含区間
 * 出力量の不確かさに対する各入力量の不確かさの寄与を定量的に示す不確かさバジェット

 NIST Uncertainty Machineの詳細とその利用例については，[利用マニュアル](./NISTUncertaintyMachine-UserManual.pdf)，および文献 T. Lafarge and A. Possolo (2015) "The NIST Uncertainty Machine", NCSLI Measure Journal of Measurement Science, volume 10, number 3 (September), pages 20-27 を参照ください。


 NISTはアメリカ合衆国の国家計量標準機関です。詳細については [www.nist.gov](https://www.nist.gov) をご覧下さい。NISTは1901年に米国商務省の中に設立された政府機関です。NISTの使命は，測定の科学･標準･技術を，経済安全保障の強化と私たちの生活の質の向上に役立つように発展させることを通じて，米国の革新と産業競争力強化を推進することです。


 バグの報告とソフトウェアツールの改良の提案を歓迎します。 [antonio.possolo@nist.gov](mailto:antonio.possolo@nist.gov) までご連絡お願いします。




## 実行手順

 * 入力量の個数を選択します。
 * 必要に応じて変数名を変更します。
 * 各入力量に対して，分布の種類と分布パラメータを選びます。
 * 反復計算の回数を指定します。
 * 出力量の定義を，R言語の数式の形で記述します。
 * 計算を実行します。

## 検証･確認のためのRスクリプト


`FullScriptNUM.R` は，NIST Uncertainty Machine (NUM) で得られた計算結果の妥当性を検証･確認したり再現したりする必要があるとユーザが考えるとき，計算をローカルに実行するためのRスクリプトです。
より詳細な情報については，[利用マニュアル第６章]("./NISTUncertaintyMachine-UserManual.pdf#page=17")を参照ください。


NUMによって生成された計算構成ファイルを`FullScriptNUM.R`に引数として渡すことにより，同じ計算構成ファイルを使ってweb上のソフトウェアツールを稼動したときと同じ結果が得られます。

計算構成ファイルの名前を `NUMConfigExample.um` としたとします。Rスクリプトは次のコマンドにより実行できます:

`$ Rscript FullScriptNUM.R NUMConfigExample.um`



このスクリプトは計算構成ファイルの名前を共通の接頭辞としてもつ３つのファイルを生成します。上の例の場合，生成ファイルは次のようになります:

* `NUMConfigExample-result.txt`, NUMのWeb上の数値出力と同じ結果と配置を与えるテキストファイル;
* `NUMConfigExample-density.jpg`, 2つの確率密度分布を示す，NUMのWeb上のグラフ出力と同じ図を与えるJPEGファイル;
* `NUMConfigExample-value.Rd`, GUM補完文書1 に記載されているモンテカルロ法の反復計算において生成された入力量の値，および対応する出力量の値をR言語のバイナリデータとして保存したファイル。R言語では，コマンド `load('NUMConfigExample-values.Rd')` を実行することにより，計算構成ファイルで指定された数と名前の入力量に対応するベクトル，および出力量に対応する "y" という名前のベクトルが生成されます。



上述のRスクリプトは，実行に必要なRパッケージがローカルのRシステムにまだインストールされていない場合，それらをインスト－ルします。Rスクリプトは，最初にそのバージョン番号をターミナルウィンドウに表示します。これはweb上のソフトウェアツールの画面上端に表示されるバージョン番号と一致している必要があります。

## ダウンロード
  *   [NIST Validation & Verification Script Version 1.5](./FullScriptNUM/FullScriptNUM_1.5.R)
  *   [NIST Validation & Verification Script Version 1.4.2 & 1.4.3](./FullScriptNUM/FullScriptNUM_1.4.2.R)
  *   [NIST Validation & Verification Script Version 1.4](https://uncertainty.nist.gov/FullScriptNUM/FullScriptNUM_1.4.R)
  *   [NIST Validation & Verification Script Version 1.3.6](https://uncertainty.nist.gov/FullScriptNUM/FullScriptNUM_1.3.6.R)
  *   [NIST Validation & Verification Script Version 1.3.5](https://uncertainty.nist.gov/FullScriptNUM/FullScriptNUM_1.3.5.R)
  *   [NIST Validation & Verification Script Version 1.3.4](https://uncertainty.nist.gov/FullScriptNUM/FullScriptNUM_1.3.4.R)

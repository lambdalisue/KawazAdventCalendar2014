% 初心者がモチベーション上げながらプログラミングをしてシューティング（っぽい）ゲームを1本作る！
% Alisue (http://hashnote.net/)
% 2013/12/25

# はじめに
この記事は[Kawaz Advent Calendar 2014](http://www.kawaz.org/blogs/giginet/2013/11/29/540/)
のクリスマスの記事として書かれました。
この記事は「初心者がモチベーション上げながらプログラミングをしてシューティング（っぽい）ゲームを1本作る！」
という目標の元書かれています。
この目的のために、以下のような方針を打ち立てました。

1.  インストールが難しい言語はご法度（例 C/C++ や Java など）
2.  可能な限りプログラミング以外の部分のイザコザをなくす（Pythonの文字コード論外）
3.  Windows および Mac で共に同じように動作すること（.net framework vs Mono 論外）
4.  「仕組み」の理解に重点を置くためフレームワークなどは一切使用しない（ああいう
    のは内部を知っている人が使うべきものです）
5.  つまづきやすいオブジェクト指向は使わない（つまづいてしまったら意味がないので）
6.  嘘でもいいのでなるべくわかりやすく説明する（レベルが上がれば自ずと間違いに気づくでしょう）

したがって既にゲームをつくったことがある方や、オブジェクト指向バリバリな方などには
全く参考になりません。
そのあたりはご了承ください。

どこでもなるべく同じように動き、インストールなどが簡単な言語として今回はJavaScript
を選ぶことにしました。
まぁこの時点でご存じの方は冷や汗ものだと思いますが、いろいろと制限をすればJavaScriptは
初心者でも扱える言語です（だと信じたい）。

では「初心者がモチベーション上げながらプログラミングをしてシューティング（っぽい）ゲームを1本作る！」を開始しましょう。
まずは準備からです。

## ブラウザの準備
すでに Google Chrome の最新版を使用している方は読み飛ばして
ください。
それ以外の方で Internet Explorer を使用している人以外は**最新版の Google Chrome を
インストール**してください。

もしも**普段から Internet Explorer を使用している人**がいた場合は下記のステップを実行したあと
最新版の Google Chrome をインストールしてください。

1.  ホームセンターに行き 1) 着火剤 2) 炭 3) 机に使用出来るくらいのサイズの鉄板
    を購入。またスーパーに行き豚肉 100 g を購入
2.  購入した鉄板が乗る程度に炭を広げ、着火剤を用いて全炭が最高温度になる位まで
    しっかりと火をつける（なお、この作業は外で行なってください）
3.  鉄板を炭の上に載せ、しっかりと温める。この際購入した豚肉がちゃんと焼けるか
    により温度を確認してください
4.  鉄板の上で10秒以上土下座を行ってください

参考

-   [焼き土下座](https://www.google.co.jp/search?q=%E7%84%BC%E3%81%8D%E5%9C%9F%E4%B8%8B%E5%BA%A7&safe=off&source=lnms&tbm=isch&sa=X&ei=ZkG1UtWBNYPulAWD2IG4Bg&ved=0CAkQ_AUoAQ&biw=1600&bih=1081)
-   [[IEよ滅べ！の意味がわからない方] いざ、爆速と美麗のWWWへ！IEがダメな理由教えます](http://euppho.tumblr.com/post/51867690006)

とりあえず**Google Chromeが最低の条件なのでこいつをインストールしてください**。

## テキストエディタの準備
普段プログラミングなどを行わない方にとって、文字を書くソフトと言えばワードかと
思います。
しかしワードはプログラミングをするという目的においてカスなので、プログラミング
に向いた軽量のテキストエディタを準備してください。
以下お勧めです。

-   **[Notepad++](http://notepad-plus-plus.org/)**  
    Windowsを使用している人向け。
    おそらく現存するメモ帳系アプリにおいて最強です。
    軽量でかつ高機能なのでWindowsの方はこれを使えばよいでしょう
-   **[CotEditor](http://sourceforge.jp/projects/coteditor/)**  
    Mac OS Xを使用している人向け。
    僕が知っている限りでは、このアプリが軽量かつ高機能なので一択です。
    Macはデフォルトのメモ帳系アプリが本当にクズなので、使わないと思っても
    インストールはしておいて欲しい一品
-   **[GVim/MacVim](http://ja.wikipedia.org/wiki/Vim)**  
    変態が使用するエディタです。
    変態になりたい場合は使ってください。
    [Macを購入したら絶対に導入したい！私が3年間で厳選した超オススメアプリ10選！](http://blog.supermomonga.com/articles/vim/startdash-with-mac.html)
-   **[Emacs](http://ja.wikipedia.org/wiki/Emacs)**  
    変態が使用するエディタ2です。
    変態になりたい場合は使ってください。
    [Mac を購入したら絶対に導入したい！超オススメアプリ 10 選！](http://blog.id774.net/post/2013/10/11/408/)

参考

-   [エディタ戦争](http://ja.wikipedia.org/wiki/%E3%82%A8%E3%83%87%E3%82%A3%E3%82%BF%E6%88%A6%E4%BA%89)
-   [2011年テキストエディタ界の動向まとめと、来年次のvimエディタ普及に向けた対策資料](http://d.hatena.ne.jp/shim0mura/20111220/1324575061)

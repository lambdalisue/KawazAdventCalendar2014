"use strict"
// --- 必要な変数をすべて定義（複数定義するばあいは , で区切る）

// pocket -- 所持金
var pocket;
// apple_price -- りんごの値段
// apple_count -- りんごの個数
var apple_price, apple_count;
// orange_price -- みかんの値段
// orange_count -- みかんの個数
var orange_price, orange_count;

// --- 文章題で与えられた数値を代入

// 所持金は500円
pocket = 500;

// りんごの値段は60円
apple_price = 60;
// りんごの数は3つ
apple_count = 3;

// みかんの値段は30円
orange_price = 30;
// みかんの数は4つ
orange_count = 4;

// 残高を求める
//
// balance -- 残高
// 残高 = 所持金 - りんごの値段 x りんごの個数 - みかんの値段 x みかんの個数
//
// 注意: コンピュータでは掛け算は * を使う
//
var balance = pocket - apple_price * apple_count - orange_price * orange_count;

// 残高を表示
console.log("たかしくんの残金は" + balance + "円");

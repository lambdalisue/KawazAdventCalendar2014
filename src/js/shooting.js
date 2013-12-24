"use strict"
// 全体で使用する変数を定義
var canvas, ctx;

// ページロード時に呼び出される処理を指定
// window.onload = function(){ から }; までの間が呼び出される。
window.onload = function() {
    // id を用いてキャンバスオブジェクトを取得し
    // canvas 変数に代入
    //
    //   オブジェクト = document.getElementById('id');
    //
    canvas = document.getElementById('screen');

    // 2次元用の描画コンテキスト（とよばれるナニか）を取得し代入
    ctx = canvas.getContext('2d');

    // 塗りつぶしの色を指定（白）
    ctx.fillStyle = '#fff';
    // 塗りつぶされた四角形（横,縦 = 20, 30）を（8, 5）の位置に描画
    ctx.fillRect(8, 5, 20, 30);

    // 線の色を指定（赤）
    ctx.strokeStyle = '#f00';
    // からっぽの四角形（横,縦 = 90, 10）を（40, 55）の位置に描画
    ctx.strokeRect(40, 55, 90, 10);
};

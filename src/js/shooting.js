"use strict"
// 全体で使用する変数を定義
var canvas, ctx;
// プレイヤーの画像を保持する変数を定義
var img_player;
// 敵キャラの画像を保持する変数を定義
var img_enemy;

// キーが押された時に呼び出される処理を指定
window.onkeydown = function(e) {
    // キーボードが押されるとこの内部の処理が実行される
    console.log("キーボードが押されたよ");
};

// ページロード時に呼び出される処理を指定
window.onload = function() {
    // コンテキストを取得（おまじない）
    canvas = document.getElementById('screen');
    ctx = canvas.getContext('2d');

    // Playerの画像（id='player'で指定された<img>）を取得
    img_player = document.getElementById('player');
    // 敵キャラの画像（id='enemy'で指定された<img>）を取得
    img_enemy = document.getElementById('enemy');

    // Playerの画像を (20, 50) の位置に描画
    ctx.drawImage(img_player, 20, 50);
    // 敵キャラの画像をランダムな位置に表示
    for(var i=0; i<10; i++) {
        ctx.drawImage(img_enemy,
                    Math.random() * (canvas.width - img_enemy.width),
                    Math.random() * (canvas.height - img_enemy.height));
    }
};

"use strict"
// 全体で使用する変数を定義
var canvas, ctx;
// プレイヤーの画像を保持する変数を定義
var img_player;
// 敵キャラの画像を保持する変数を定義
var img_enemy;

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
    // 敵キャラの画像をいろんなところに描画
    ctx.drawImage(img_enemy, 60, 20);
    ctx.drawImage(img_enemy, 60, 30);
    ctx.drawImage(img_enemy, 60, 40);
    ctx.drawImage(img_enemy, 60, 50);
    ctx.drawImage(img_enemy, 60, 90);
    ctx.drawImage(img_enemy, 90, 20);
    ctx.drawImage(img_enemy, 90, 30);
    ctx.drawImage(img_enemy, 90, 40);
    ctx.drawImage(img_enemy, 90, 50);
    ctx.drawImage(img_enemy, 90, 90);
    ctx.drawImage(img_enemy, 120, 20);
    ctx.drawImage(img_enemy, 120, 30);
    ctx.drawImage(img_enemy, 120, 40);
    ctx.drawImage(img_enemy, 120, 50);
    ctx.drawImage(img_enemy, 120, 90);
};

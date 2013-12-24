"use strict"
// 全体で使用する変数を定義
var canvas, ctx;
// プレイヤーの画像を保持する変数を定義
var img_player;
// 敵キャラの画像を保持する変数を定義
var img_enemy;
// プレイヤーの現在位置を保持する変数を定義
// player_x -- プレイヤーのx座標
// player_y -- プレイヤーのy座標
var player_x, player_y;

// キーが押された時に呼び出される処理を指定
window.onkeydown = function(e) {
    // 上下左右の移動速度を定義
    var SPEED = 2;

    // キー番号だとわかりにくいため予め変数に格納
    var RIGHT = 39;
    var LEFT  = 37;

    // 移動処理を行ったかどうか（Yes/No）を表す変数を定義し
    // 移動していない（false）で初期化
    var moved = false;

    if(e.keyCode == RIGHT) {
        // プレイヤーのx座標を少し増やす
        player_x += SPEED;
        // 移動したので true を代入
        moved = true;
    } else if(e.keyCode == LEFT) {
        // プレイヤーのx座標を少し減らす
        player_x -= SPEED;
        // 移動したので true を代入
        moved = true;
    }

    // キー入力により移動したか調べる
    // 注意: 真偽値なので moved == true のようにしなくても同じ意味になる
    if(moved) {
        // キャンバスをクリアする
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 新しい位置にプレイヤーを描画
        ctx.drawImage(img_player, player_x, player_y);
    }
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

    // Playerの初期位置を指定
    // player_x = キャンバスの左右中央
    // player_y = キャンバスの下から20px上
    player_x = (canvas.width - player.width) / 2;
    player_y = (canvas.height -player.height) - 20;

    // Playerの画像を (player_x, player_y) の位置に描画
    ctx.drawImage(img_player, player_x, player_y);
    // 敵キャラの画像をランダムな位置に表示
    for(var i=0; i<10; i++) {
        ctx.drawImage(img_enemy,
                    Math.random() * (canvas.width - img_enemy.width),
                    Math.random() * (canvas.height - img_enemy.height));
    }
};

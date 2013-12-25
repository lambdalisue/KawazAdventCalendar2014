"use strict"
var canvas, ctx
// 上下左右を表す定数（変わらない変数）を定義
var ORI_TOP    = parseInt("0001", 2)
var ORI_BOTTOM = parseInt("0010", 2)
var ORI_RIGHT  = parseInt("0100", 2)
var ORI_LEFT   = parseInt("1000", 2)

// ゲームの状態を表す変数を定義
var game_state

// キャラクターの画像を保管する変数を定義
var pl_player1, pl_player2, pl_p1bullet

// プレイヤーおよび敵の位置を保存する変数を宣言
var pl_player1_x, pl_player1_y
var pl_player2_x, pl_player2_y
var pl_p1bullet_x, pl_p1bullet_y
// 敵の速度を保存する変数を宣言
var pl_player2_vx, pl_player2_vy
// プレイヤーおよび敵のHPを保存する変数を宣言
var pl_player1_HP, pl_player2_HP

// 2つの四角形が当たっているかを判定する関数を定義
var isHit = function(x1, y1, w1, h1, x2, y2, w2, h2) {
    if(((x1 > x2 && x1 < x2 + w2) ||
        (x2 > x1 && x2 < x1 + w1)) &&
       ((y1 > y2 && y1 < y2 + h2) ||
        (y2 > y1 && y2 < y1 + h1))) {
        // 当たっている場合は true を返す
        return true
    }
    // 当たっていない場合は false を返す
    return false
}

// キャンバスの中にいるかを返す関数を定義
var isInCanvas = function(x, y, width, height) {
    // 方向を保存する変数
    var ori = 0
    // 左右方向のハミ出しを確認
    if(x < 0) {
        // 左側がはみ出ている場合は ORI_LEFT フラグを立てる
        ori = ori | ORI_LEFT
    } else if(x+width > canvas.width) {
        // 右側がはみ出ている場合は ORI_RIGHT フラグを立てる
        ori = ori | ORI_RIGHT
    }
    // 上下方向のハミ出しを確認
    if(y < 0) {
        // 上側がはみ出ている場合は ORI_TOP フラグを立てる
        ori = ori | ORI_TOP
    } else if(y+height > canvas.height) {
        // 下側がはみ出ている場合は ORI_BOTTOM フラグを立てる
        ori = ori | ORI_BOTTOM
    }
    // 結果を返す
    return ori
}
// 弾を動かす関数を定義
var moveBullet = function() {
    // ゲームの状態が実行中ではない場合は何もせずに処理を終了
    if(game_state != 1) {
        return
    }
    // はみ出している方向を取得
    var ori = isInCanvas(pl_p1bullet_x[i],
                         pl_p1bullet_y[i],
                         pl_p1bullet.width,
                         pl_p1bullet.height)
    // 上方向にはみ出しているか？
    if((ori & ORI_TOP) != 0) {
        // 上方向にはみ出しているので弾を消す
        pl_p1bullet_x = 0 - pl_p1bullet.width
        pl_p1bullet_y = 0 - pl_p1bullet.height
        // 弾を動かす処理をやめるため、ここで処理を終了する
        // （setTimeoutを呼び出さない）
        return
    }

    // 敵との当たり判定
    for(var i=0; i<10; i++) {
        // この敵が生きているか確認して死んでいたらスルーして次
        if(pl_player2_HP[i] <= 0) {
            continue
        }

        // 弾と当たっているか判定
        if(isHit(pl_p1bullet_x,      // 弾
                 pl_p1bullet_y,      // 弾
                 pl_p1bullet.width,
                 pl_p1bullet.height,
                 pl_player2_x[i],   // 敵キャラ
                 pl_player2_y[i],   // 敵キャラ
                 pl_player2.width,
                 pl_player2.height)) {
            // 敵のHPを削る
            pl_player2_HP[i] = pl_player2_HP[i] - 1
            // もしも敵キャラのHPが0以下になった場合はキャンバスの外に出す
            if(pl_player2_HP[i] <= 0) {
                pl_player2_x[i] = 0 - pl_player2.width
                pl_player2_y[i] = 0 - pl_player2.height
                // 処理を続ける意味がないのでスルーして次のループに
            }
            // 敵と当たったので弾を消す
            pl_p1bullet_x = 0 - pl_p1bullet.width
            pl_p1bullet_y = 0 - pl_p1bullet.height
            // 弾を動かす処理をやめるため、ここで処理を終了する
            // （setTimeoutを呼び出さない）
            return
        }
    }

    // 弾を縦方向に動かす
    pl_p1bullet_y = pl_p1bullet_y - 10

    // 再描画する
    redraw()

    // 30ミリ秒後に再度呼び出す
    setTimeout(moveBullet, 30)
}

// 敵キャラを動かす関数を定義
var moveEnemies = function() {
    // ゲームの状態が実行中ではない場合は何もせずに処理を終了
    if(game_state != 1) {
        return
    }

    for(var i=0; i<10; i++) {
        // この敵が生きているか確認して死んでいたらスルーして次
        if(pl_player2_HP[i] <= 0) {
            continue
        }

        // はみ出している方向を取得
        var ori = isInCanvas(pl_player2_x[i],
                             pl_player2_y[i],
                             pl_player2.width,
                             pl_player2.height)
        // 左右方向にはみ出しているか？
        if(((ori & ORI_LEFT) | (ori & ORI_RIGHT)) != 0) {
            // 左右方向にはみ出しているので横方向の速度を逆にする
            pl_player2_vx[i] = -1 * pl_player2_vx[i] 
        }
        // 上下方向にはみ出しているか？
        if(((ori & ORI_TOP) | (ori & ORI_BOTTOM)) != 0) {
            // 上下方向にはみ出しているので縦方向の速度を逆にする
            pl_player2_vy[i] = -1 * pl_player2_vy[i] 
        }

        // 自キャラと当たっているか判定
        if(isHit(pl_player1_x,      // 自キャラ
                 pl_player1_y,      // 自キャラ
                 pl_player1.width,
                 pl_player1.height,
                 pl_player2_x[i],   // 敵キャラ
                 pl_player2_y[i],   // 敵キャラ
                 pl_player2.width,
                 pl_player2.height)) {
            // お互いのHPを削る
            pl_player1_HP = pl_player1_HP - 1
            pl_player2_HP[i] = pl_player2_HP[i] - 1
            // 敵を跳ね返す
            pl_player2_vx[i] = -1 * pl_player2_vx[i] 
            pl_player2_vy[i] = -1 * pl_player2_vy[i] 

            // もしも自キャラのHPが0以下になった場合はゲームを止める
            if(pl_player1_HP <= 0) {
                game_state = 0
                gameOver()
                // 処理を続ける意味がないのでループを抜ける
                return
            }
            // もしも敵キャラのHPが0以下になった場合はキャンバスの外に出す
            if(pl_player2_HP[i] <= 0) {
                pl_player2_x[i] = 0 - pl_player2.width
                pl_player2_y[i] = 0 - pl_player2.height
                // 処理を続ける意味がないのでスルーして次のループに
                continue
            }
        }

        // 他の敵と当たっているか測定
        for(var j=i+1; j<10; j++) {
            // 当たっているか測定
            var hit = isHit(pl_player2_x[i],    // 自分x
                            pl_player2_y[i],    // 自分y
                            pl_player2.width,
                            pl_player2.height,
                            pl_player2_x[j],    // 相手x
                            pl_player2_y[j],    // 相手y
                            pl_player2.width,
                            pl_player2.height)

            if(hit == 1) {
                // 当たっていた場合は自分と相手の速度を逆に
                pl_player2_vx[i] = -1 * pl_player2_vx[i] 
                pl_player2_vy[i] = -1 * pl_player2_vy[i] 
                pl_player2_vx[j] = -1 * pl_player2_vx[j] 
                pl_player2_vy[j] = -1 * pl_player2_vy[j] 
                // これ以上ループを回す意味もないのでループを抜ける
                break
            }
        }

        // 各速度に応じて位置を移動
        pl_player2_x[i] = pl_player2_x[i] + pl_player2_vx[i]
        pl_player2_y[i] = pl_player2_y[i] + pl_player2_vy[i]
    }
    // 再描画する
    redraw()
    // 30ミリ秒後に再度呼び出す
    setTimeout(moveEnemies, 30)
}

// ゲームオーバー画面を表示
var gameOver = function() {
    // キャンバスを全消し
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // フォント指定
    ctx.fillStyle = "red"
    ctx.font = "bold 10pt serif"
    ctx.fillText("Game Over", 10, 20)
}

// キャンバスを再描画する関数を定義
var redraw = function() {
    // キャンバスを全消し
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // 新しい位置にプレイヤーを描画する
    ctx.drawImage(pl_player1, pl_player1_x, pl_player1_y)
    // 敵を再描画する
    for(var i=0; i<10; i++) {
        ctx.drawImage(
            pl_player2,
            pl_player2_x[i],
            pl_player2_y[i]
        )
    }
    // 新しい位置に弾を描画する
    ctx.drawImage(pl_p1bullet, pl_p1bullet_x, pl_p1bullet_y)

    // 自機のHPを表示
    ctx.fillStyle = 'white'     // fillの色を指定（塗りつぶし）
    ctx.strokeStyle = 'black'   // strokeの色を指定（線の色）
    // 最大HP（10）だけ円を少しずつずらして描画
    for(var i=0; i<10; i++) {
        // パス（お絵かき）を書く時のおまじない
        ctx.beginPath()
        // 半径5の円を描く（Math.PI*2 = 2π）
        // ctx.arc(x, y, radius, start, end)
        ctx.arc(10 + 10 * i, 10, 5, 0, Math.PI*2)
        // 円を塗りつぶす
        ctx.fill()
        // 円の線を描く
        ctx.stroke()
    }
    // fillの色を赤に変更
    ctx.fillStyle = 'red'
    // 現在のHPだけ円を少しずらして描画
    for(var i=0; i<pl_player1_HP; i++) {
        ctx.beginPath()
        ctx.arc(10 + 10 * i, 10, 5, 0, Math.PI*2)
        ctx.fill()
        ctx.stroke()
    }
}

// キーが押された時に呼び出される処理を指定
window.onkeydown = function(e) {
    // ゲームの状態が実行中ではない場合は何もせずに処理を終了
    if(game_state != 1) {
        return
    }

    // どの方向がはみ出ているのかを調べる
    // 0000 -- はみ出てない
    // 0001 -- 上
    // 0010 -- 下
    // 0100 -- 右
    // 1000 -- 左
    var orientation = isInCanvas(pl_player1_x,
                                 pl_player1_y,
                                 pl_player1.width,
                                 pl_player1.height)

    // どのキーが押されたかによって処理を分ける
    // なおキー入力の方向にはみ出ていた場合は無視する
    if(e.keyCode == 39 && (orientation & ORI_RIGHT) != ORI_RIGHT) {
        // 右が押されたらプレイヤーの横位置を +5 する
        pl_player1_x = pl_player1_x + 5
        // キャンバスを再描画
        redraw()
    }
    if(e.keyCode == 37 && (orientation & ORI_LEFT) != ORI_LEFT) {
        // 左が押されたらプレイヤーの横位置を -5 する
        pl_player1_x = pl_player1_x - 5
        // キャンバスを再描画
        redraw()
    }
    if(e.keyCode == 38 && (orientation & ORI_TOP) != ORI_TOP) {
        // 上が押されたらプレイヤーの縦位置を -5 する
        pl_player1_y = pl_player1_y - 5
        // キャンバスを再描画
        redraw()
    }
    if(e.keyCode == 40 && (orientation & ORI_BOTTOM) != ORI_BOTTOM) {
        // 下が押されたらプレイヤーの縦位置を ;5 する
        pl_player1_y = pl_player1_y + 5
        // キャンバスを再描画
        redraw()
    }
    if(e.keyCode == 32) {
        // スペースキーが押されたら弾を発射する？
        
        // もしも弾が発射済みなら無視する（発射済みならキャンバス内に存在）
        if(isInCanvas(pl_p1bullet_x,
                      pl_p1bullet_y,
                      pl_p1bullet.width,
                      pl_p1bullet.height) != 0) {
            // キャンバス内にいないので発射
                

            // 弾の位置を現在のプレイヤーの位置と同じにする（発射初期位置）
            pl_p1bullet_x = pl_player1_x
            pl_p1bullet_y = pl_player1_y

            // 弾を発射する
            moveBullet()
        }
    }
}

// ページロード時に呼び出される処理を指定
window.onload = function() {
    // キャンバスをIDを用いて取得する
    canvas = document.getElementById('field')

    // 2次元描画用のコンテキストを取得（コンテキストってなには聞かない）
    ctx = canvas.getContext('2d')

    // ゲームの状態を「実行中」に設定
    game_state = 1

    // プレイヤー・敵の画像を取得
    pl_player1 = document.getElementById('pl_player1')
    pl_player2 = document.getElementById('pl_player2')
    pl_p1bullet = document.getElementById('pl_p1bullet')

    // プレイヤーの初期位置を設定
    pl_player1_x = 50
    pl_player1_y = 50
    // プレイヤーのHPを設定
    pl_player1_HP = 10
    // 弾の初期位置を設定（画面外）
    pl_p1bullet_x = 0 - pl_p1bullet.width
    pl_p1bullet_y = 0 - pl_p1bullet.height

    // 敵の位置保管変数に要素数10の配列を格納
    pl_player2_x = new Array(10)
    pl_player2_y = new Array(10)
    // 敵の速度保管変数に要素数10の配列を格納
    pl_player2_vx = new Array(10)
    pl_player2_vy = new Array(10)
    // 敵のHP保管変数に要素数10の配列を格納
    pl_player2_HP = new Array(10)

    // 敵の位置・速度・HPを初期化
    // Math.random() -- 0-1のランダムな値を返す関数
    // canvas.width -- キャンバスの横幅が入っている変数
    // canvas.height -- キャンバスの縦幅が入っている変数
    // pl_player2.width -- pl_player2の画像横幅
    // pl_player2.height -- pl_player2の画像縦幅
    for(var i=0; i<10; i++) {
        pl_player2_x[i] = Math.random()*(canvas.width-pl_player2.width)
        pl_player2_y[i] = Math.random()*(canvas.height-pl_player2.height)
        // 速度は -5 ~ 5 の範囲でランダムに指定
        pl_player2_vx[i] = Math.random()*10 - 5
        pl_player2_vy[i] = Math.random()*10 - 5
        // HPは 1 ~ 5 の範囲でランダムに指定
        pl_player2_HP[i] = Math.random()*5 + 1
    }

    // せっかくなので一番最初の描画も redraw でやる
    redraw()

    // 敵キャラを動かし出す
    moveEnemies()

    // ロードが完了したことをログに記録
    console.log('ロード完了')
}

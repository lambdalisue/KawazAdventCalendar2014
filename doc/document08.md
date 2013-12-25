# 弾を打って敵を倒す
さて、いい加減弾を打てるようにします。
現段階でも見た目の調整（画像差し替えやエフェクト）をすれば結構ゲームぽくはなり
ますが、一応シューティングを作るのが目的なので外せません。

## 弾を発射する
基本的には敵を動かしたときと同様に**for文**で処理をします。
ただ弾は任意のタイミングで現れるので、必要になるまではHPを0として保持し、発射さ
れた弾のHPのみ1とします。
このように弾の状態をHPで管理しておけばプレイヤーや敵キャラと似た処理を
おこなえます（HPが0なら表示や操作をしない）。
それらを踏まえて下記コードを参考に `shooting.js` を書き換えてください。

```javascript
// ...
// 弾の数を定義（同時に描画される弾の最大数より大きい必要あり）
var BULLETS = 5;
// ...
var img_player;
// プレイヤーの弾画像を保持する変数を定義
var img_player_bullet;
// ...
var player_x, player_y;
// プレイヤーの弾の現在位置（配列）を保持する変数を定義し
// BULLETS分だけ要素数を持つ配列を代入
var player_bullets_x = new Array(BULLETS);
var player_bullets_y = new Array(BULLETS);
// ...
var player_hp;
// 弾のヒットポイント（配列）を保持する変数を定義し
// BULLETS分だけ要素数を持つ配列を代入
var player_bullets_hp = new Array(BULLETS);
// ...


// 再描画する関数（無引数、無戻り値）
var redraw = function() {
    // ...

    // 生きている場合だけ新しい位置にプレイヤーを描画
    // ...

    // 弾の画像を (bullets_x[i], bullets_y[i]) の位置に表示
    for(var i=0; i<BULLETS; i++) {
        // 生きている場合だけ描画
        if(player_bullets_hp[i] > 0) {
            ctx.drawImage(img_player_bullet,
                          player_bullets_x[i],
                          player_bullets_y[i]);
        }
    }

    // 敵キャラの画像を (enemies_x[i], enemies_y[i]) の位置に表示
    // ...
};

// プレイヤーの移動処理を定義
var movePlayer = function() {
    // ...

    // キー番号だとわかりにくいため予め変数に格納
    var RIGHT = 39;
    var LEFT  = 37;
    var SPACE = 32;

    // ...

    if(KEYS[SPACE]) {
        // 未使用の弾があれば発射する
        for(var i=0; i<BULLETS; i++) {
            if(player_bullets_hp[i] == 0) {
                // 弾の初期位置はプレイヤーと同じ位置にする
                player_bullets_x[i] = player_x;
                player_bullets_y[i] = player_y;
                // 弾のHPを1にする。これにより次のループから描画や移動処理
                // が行われるようになる
                player_bullets_hp[i] = 1;
                // 弾は打ったのでループを抜ける
                // ループ処理を途中でやめる場合は `break` を使う
                break;
            }
        }
    }

    // プレイヤーがはみ出てしまった場合は強制的に中に戻す
    // ...
};
// プレイヤーの弾の移動処理を定義
var movePlayerBullets = function() {
    // 上下左右の移動速度を定義
    var SPEED = -6;

    // 各弾ごとに処理を行う
    for(var i=0; i<BULLETS; i++) {
        // ヒットポイントを確認し、生きている場合のみ処理をする
        if(player_bullets_hp[i] <= 0) {
            // ループの残りのステップを無視して次のループに行く場合
            // は `continue` を指定する
            continue;
        }

        // 弾のy座標を少し増やす（減らす）
        player_bullets_y[i] += SPEED;

        // 弾が上画面にはみ出た場合はHPを0にして未使用状態に戻す
        if (player_bullets_y[i] < img_player_bullet.height) {
            player_bullets_hp[i] = 0;
        }
    }
};
// 敵キャラの移動処理を定義
// ...

// メインループを定義
var mainloop = function() {
    // ...

    // プレイヤーの移動処理
    movePlayer();
    // プレイヤーの弾の移動処理
    movePlayerBullets();

    // ...
};

// ...

// ページロード時に呼び出される処理を指定
window.onload = function() {
    // ...

    // Playerの画像（id='player'で指定された<img>）を取得
    img_player = document.getElementById('player');
    // Playerの弾画像（id='player_bullet'で指定された<img>）を取得
    img_player_bullet = document.getElementById('player_bullet');
    // ...

    // 弾の初期位置およびHPを指定
    for(var i=0; i<BULLETS; i++) {
        player_bullets_x[i] = 0;
        player_bullets_y[i] = 0;
        player_bullets_hp[i] = 0;
    }
    // 敵キャラの初期位置およびHPを指定
    // ...
};
```

実行しスペースを押すと「バグバグ」と書かれた弾が5個連なって発射されると思います。
これは連射速度が早すぎて弾が5個では足りないために起こる現象です。

## 間隔をおいて弾を発射する
先の状態だと一気に弾が発射されてしまいました。
連射速度が早過ぎますね。
したがって「カウンター」を使用して数フレームの間弾の発射を禁止します。
詳しく説明すると、インターバルカウンターの値が0の時のみ発射を許可するようにします。
弾を発射した後はこのカウンターに大きな値を入れます。
そして毎フレームごとに1づつ値を減らします。
するとカウンターの値は最初に設定した値のフレーム数後に0に戻るのでまた発射可能に
なります。

下記コードを参考に `shooting.js` を書き換えてください。

```javascript
// ...
// 発射インターバルの値を定義（この値が大きいほど連射が遅くなる）
var FIRE_INTERVAL = 20;
// 弾の数を定義（同時に描画される弾の最大数より大きい必要あり）
// ...
var enemies_hp = new Array(ENEMIES);
// プレイヤーの発射インターバル
var player_fire_interval=0;

// ...

// プレイヤーの移動処理を定義
var movePlayer = function() {
    // ...

    // スペースキーが押され、なおかつ発射インターバルが0の時だけ発射する
    if(KEYS[SPACE] && player_fire_interval == 0) {
        // 未使用の弾があれば発射する
        for(var i=0; i<BULLETS; i++) {
            if(player_bullets_hp[i] == 0) {
                // ...
                // 弾を打ったので発射インターバルの値を上げる
                player_fire_interval = FIRE_INTERVAL;
                // 弾は打ったのでループを抜ける
                // ループ処理を途中でやめる場合は `break` を使う
                break;
            }
        }
    }
    // 発射インターバルの値が0より大きい場合は値を減らす。
    if(player_fire_interval > 0) {
        // 変数++; や 変数--; はそれぞれ1増やす、減らすという処理
        // そのため下記は `player_fire_interval -= 1;`と等価
        player_fire_interval--;
    }
    // ...
};
```

この変更により連射速度が大幅に落ち、同時に5個以上の弾がキャンバス内に存在するこ
とはなくなりました。

## 当たり判定処理
最後に弾と敵の当たり判定を行います。
基本的にプレイヤーと敵の当たり判定と同様ですが、弾も敵も配列に入っているため
二重ループを使わなければならない部分が異なります。
**添字に注意して**下記のように `shooting.js` を修正してください。

```javascript
// ...

// メインループを定義
var mainloop = function() {
    // ...

    // プレイヤーと敵キャラの当たり判定（プレイヤーが生きている場合）
    if(player_hp > 0) {
        for(var i=0; i<ENEMIES; i++) {
            // 敵が生きている場合のみ判定する
            if(enemies_hp[i] > 0) {
                if(hitCheck(player_x, player_y, img_player,
                            enemies_x[i], enemies_y[i], img_enemy)){
                    // 当たっているのでお互いのHPを1削る
                    player_hp -= 1;
                    enemies_hp[i] -=1;
                }
            }
        }
    }
    // プレイヤー弾と敵キャラの当たり判定（プレイヤーが生きている場合）
    if(player_hp > 0) {
        for(var i=0; i<ENEMIES; i++) {
            // 敵が死んでいる場合はスルーする
            if(enemies_hp[i] <= 0) {
                continue;
            }
            for(var j=0; j<BULLETS; j++) {
                // 弾が死んでいる場合はスルーする
                if(player_bullets_hp[j] <= 0) {
                    continue;
                }
                if(hitCheck(player_bullets_x[j],
                            player_bullets_y[j],
                            img_player_bullet,
                            enemies_x[i],
                            enemies_y[i],
                            img_enemy)){
                    // 当たっているのでお互いのHPを1削る
                    player_bullets_hp[j] -= 1;
                    enemies_hp[i] -=1;
                }
            }
        }
    }

    // ...
}

// ...
```

敵が弾に二回当たると消えれば成功です。


import 'package:bonfire/bonfire.dart';
import 'package:flame/components.dart';

import 'game_sample.dart';

class Knight extends SpriteAnimationGroupComponent with HasGameRef<Sample> {
  // サイズの定義
  final _knightSize = Vector2(5.0, 10.0);

  @override
  Future<void> onLoad() async {
    // スプライトシートを定義する
    final spriteSheet = SpriteSheet(
      image: await gameRef.images.load('Soldier-A-20x20-2.png'),
      srcSize: _knightSize,
    );

    // スプライトシートから作成したアニメーションを設定する
    animations = {
      KnightState.walk: spriteSheet.createAnimation(row: 0, to: 10, stepTime: 0.1),
    };

    // その他のプロパティを設定する
    current = KnightState.walk;
    size = Vector2(_knightSize.x / 2, _knightSize.y / 2);
    anchor = Anchor.center;
  }
}

/// キャラクターの状態
enum KnightState {walk, attack}
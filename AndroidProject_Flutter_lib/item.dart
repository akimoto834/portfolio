import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:project/player.dart';
import 'game_data_load.dart';


class ItemPage extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    var l = ref.watch(playerProvider);
    fetchPlayerData(ref);
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text("Item Page!"),
      ),
      body: Center(
          child: Column(
            children: <Widget>[
              SizedBox(height: 20),
              Text("保有ポイント:"+"${ref.watch(playerPointProvider)}",
                   style: TextStyle(fontSize: 20),),
              SizedBox(height: 10),
              Container(//Containerの中でないとListViewはColumnに書けない
                  height: MediaQuery.of(context).size.height/2,
                  width: MediaQuery.of(context).size.width,
                  child:Scrollbar(
                      thumbVisibility: true,
                      thickness: 10,
                      radius: const Radius.circular(10),
                      scrollbarOrientation: ScrollbarOrientation.right,
                      child:ListView(
                        children: [
                          _menuItem(ref, l, 1, Icon(Icons.security)),
                          _menuItem(ref, l, 2, Icon(Icons.access_alarm)),
                          _menuItem(ref, l, 3, Icon(Icons.account_balance)),
                          _menuItem(ref, l, 4, Icon(Icons.account_balance)),
                          _menuItem(ref, l, 5, Icon(Icons.account_balance)),
                          _menuItem(ref, l, 6, Icon(Icons.account_balance)),
                          _menuItem(ref, l, 7, Icon(Icons.account_balance)),
                          _menuItem(ref, l, 8, Icon(Icons.account_balance)),
                        ],
                      )
                  )
              ),
            ],
          )
      ),
    );
  }
}
/*
dartではオブジェクトやリストは参照渡しであるため
List<P> buy(WidgetRef ref, List<P> l, int price){
  var result = ref.watch(playerProvider);
  result[0].point = 10;
  return result;
}
としてもresultのアドレスは変更されないため更新されない
List<P> buy(int playerID, List<P> l, int price){
  l[playerID].point -= price;
  return [...l];//スプレッド演算子を使うとうまくいく　新たなリストが作られる
}
*/
void buy(int playerID, List<P> l, int price){
  l[playerID].usedpoint += price;
  GameDataLoad.saveDocuments(
      collectionPath: "test1",
      gameID: "1",
      dataType: "Players",
      dataList: l,
      toMap: (data) => data.toMap()
  );
}

final menuprice = [1, 2, 3, 4, 5, 6, 7];

Widget _menuItem(WidgetRef ref ,List<P> l, int num, Icon icon) {
  return Container(
    decoration: new BoxDecoration(
        border: new Border(bottom: BorderSide(width: 1.0, color: Colors.grey))
    ),
    child:ListTile(
      leading: icon,
      title: Text(
        "Item"+"$num",
        style: TextStyle(color:Colors.black, fontSize: 18.0),
      ),
      onTap: () {
        buy(ref.watch(playerIDProvider), l, menuprice[num-1]);
        // リストの場合は変数のアドレスが変わる（新たにリストが生成される)と変更を通知しwidget更新？　
        //→　~.state=[P(id: 0, point: 0, score: 0),P(id: 1, point: 76, score: 36),P(id: 2, point: 80, score: 2)]とすると更新される
      },
    ),
  );
}

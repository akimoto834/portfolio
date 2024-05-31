import 'package:bonfire/bonfire.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:project/edge.dart';
import 'item.dart';
import 'node.dart';
import 'player.dart';
import 'graph_painter.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'game_data_load.dart';
import 'use_Util.dart';
import 'user.dart';
import 'dart:async';
import 'package:rxdart/rxdart.dart'; // rxdart パッケージをインポート

class GameMain extends StatelessWidget {
  const GameMain({super.key});
  // This widget is the root 1f your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'GameMain!!',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: GameMainZipPage(),

    );
  }
}

class GameMainZipPage extends ConsumerStatefulWidget {
  GameMainZipPage({super.key});
  @override
  ConsumerState<GameMainZipPage> createState() => GameMainState();
}

class GameMainState extends ConsumerState<GameMainZipPage> {
  int _selectedIndex = 0;
  String gameID  = "1";
  User? currentUser = FirebaseAuth.instance.currentUser;


  void gameIDProvide(WidgetRef ref){
    ref.watch(gameIDProvider.notifier).state = gameID;
  }

  void getUid()async{
    User? currentUser = FirebaseAuth.instance.currentUser;
    String currentUID = currentUser?.uid ?? "";
    DocumentSnapshot currentUserDoc = await FirebaseFirestore.instance.collection("Users").doc(currentUID).get();
    Map<String, dynamic> currentUserData = currentUserDoc.data() as Map<String, dynamic>;
    gameID = currentUserData["gameID"];
    gameIDProvide(ref);
    print(ref.read(gameIDProvider.notifier));
  }

  @override
  void initState() {
    super.initState();
     //try{//現在ログインしているユーザー情報を取得
       getUid();
    //}
        //catch (e) {
          //print('エラー: $e');
        //}
  }


  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
      print("タップされた場所は" + _selectedIndex.toString());
      if(_selectedIndex==1) { //ゲームがタップされたら
        //ポイントをデータベースから読み込む処理
      }
    });
  }

  @override
  Widget build(BuildContext context) {
       return Scaffold(
        appBar: AppBar(
          backgroundColor: Theme.of(context).colorScheme.inversePrimary,
          title: Text("GameMain!"),
        ),
        body: StreamBuilder<QuerySnapshot>(
            stream: FirebaseFirestore.instance.collection('test1').doc(gameID).collection('Nodes').snapshots(),
            builder: (context,snapshot) {
            // 1番目のストリームのデータを処理する
            if (!snapshot.hasData) {
              return CircularProgressIndicator(); // データが来るまでローディングを表示
            }

            final List<DocumentSnapshot> nodeDocuments = snapshot.data!.docs;


                   return Center(
                     child:InteractiveViewer(
                       constrained: false,
                       child: Stack(
                         children: <Widget>[
                           Column(
                               children: <Widget>[
                                 Text("保有ポイント:" + '${ref.watch(playerPointProvider)}',
                                   style: TextStyle(color: Colors.black, fontSize: 20), textAlign: TextAlign.center,selectionColor: Colors.indigo,),
                                 Text(
                                   '獲得スコア:' + '${ref.watch(playerProvider)[ref.watch(playerIDProvider)].score}',
                                   style: TextStyle(color: Colors.black, fontSize: 20), textAlign: TextAlign.center,),
                               ]
                           ),
                           Container(
                               color: Colors.black38,
                               height:  MediaQuery.of(context).size.height,
                               width:  MediaQuery.of(context).size.width*2,
                               child:Stack(
                                 children: [
                                   EdgeWidget(edge_id: 0, nodeDocuments: nodeDocuments),
                                   EdgeWidget(edge_id: 1, nodeDocuments: nodeDocuments),
                                   EdgeWidget(edge_id: 2, nodeDocuments: nodeDocuments),
                                   EdgeWidget(edge_id: 3, nodeDocuments: nodeDocuments),
                                   EdgeWidget(edge_id: 4, nodeDocuments: nodeDocuments),
                                   EdgeWidget(edge_id: 5, nodeDocuments: nodeDocuments),
                                   EdgeWidget(edge_id: 6, nodeDocuments: nodeDocuments),
                                   EdgeWidget(edge_id: 7, nodeDocuments: nodeDocuments),
                                   EdgeWidget(edge_id: 8, nodeDocuments: nodeDocuments),
                                   EdgeWidget(edge_id: 9, nodeDocuments: nodeDocuments),

                                   NodeWidget(node_id: 0, nodeDocuments: nodeDocuments),
                                   NodeWidget(node_id: 1, nodeDocuments: nodeDocuments),
                                   NodeWidget(node_id: 2, nodeDocuments: nodeDocuments),
                                   NodeWidget(node_id: 3, nodeDocuments: nodeDocuments),
                                   NodeWidget(node_id: 4, nodeDocuments: nodeDocuments),
                                   NodeWidget(node_id: 5, nodeDocuments: nodeDocuments),
                                   NodeWidget(node_id: 6, nodeDocuments: nodeDocuments),
                                   NodeWidget(node_id: 7, nodeDocuments: nodeDocuments),
                                 ],
                               )
                           ),
                           SizedBox(width: 10), //余白の大きさを指定
                         ],
                       ),
                     ),
                   );
             },
   ),
  );
}
}

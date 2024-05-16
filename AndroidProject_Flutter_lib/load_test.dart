import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'game_data_load.dart';
import 'player.dart';
import "edge.dart";
import 'node.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';
//実行するとデータベース初期化できる

void main() async {
  // 初期化処理を追加
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  // 使用例
  final p1 = P(id: 2, usedpoint: 300, score: 150, color: Colors.blue);
  final e1 = Edge(id: 0, startPoint: 1, endPoint: 1, cost: 150);
  final n1 = Node(id: 0, type: 0, posiX: 0, posiY: 0, nextNode: [2,3], nc: 1, ns: 1, owner: 0, player: 0);

  // PlayerオブジェクトをFirestoreに保存
  GameDataLoad.saveDocument(
      collectionPath: "test1",
      gameID: "1",
      dataType: "Players",
      data: p1,
      toMap: (data) => data.toMap()
  );

  GameDataLoad.saveDocument(
      collectionPath: "test1",
      gameID: "1",
      dataType: "Edges",
      data: e1,
      toMap: (data) => data.toMap()
  );

  GameDataLoad.saveDocument(
      collectionPath: "test1",
      gameID: "1",
      dataType: "Nodes",
      data: n1,
      toMap: (data) => data.toMap()
  );

  final nodes =
  [Node(id: 0, type: 0, posiX:5, posiY:0, nextNode:[1, 3, 4], nc: 5, ns: 7, owner: 0, player: 1),
    Node(id: 1, type: 0, posiX:0, posiY:5, nextNode:[0, 2], nc: 5, ns: 7, owner: 0, player:  0),
    Node(id: 2, type: 0, posiX:5, posiY:10, nextNode:[1, 3, 6], nc: 5, ns: 7, owner: 0, player:  0),
    Node(id: 3, type: 0, posiX:10, posiY:5, nextNode:[0, 2], nc: 5, ns: 7, owner: 0, player:  0),
    Node(id: 4, type: 0, posiX:5, posiY:3, nextNode:[0, 5, 7], nc: 4, ns: 6, owner: 0, player:  0),
    Node(id: 5, type: 0, posiX:3, posiY:5, nextNode:[4, 6], nc: 4, ns: 6, owner: 0, player:  0),
    Node(id: 6, type: 0, posiX:5, posiY:7, nextNode:[2, 5, 7], nc: 4, ns: 6, owner: 0, player:  0),
    Node(id: 7, type: 0, posiX:7, posiY:5, nextNode:[4, 6], nc: 4, ns: 6, owner: 0, player:  2),
  ];

  final edges =
  [Edge(id:0,startPoint: 0, endPoint: 1, cost: 3),
    Edge(id:1,startPoint: 0, endPoint: 3, cost: 3),
    Edge(id:2,startPoint: 0, endPoint: 4, cost: 2),
    Edge(id:3,startPoint: 1, endPoint: 2, cost: 3),
    Edge(id:4,startPoint: 2, endPoint: 3, cost: 3),
    Edge(id:5,startPoint: 2, endPoint: 6, cost: 2),
    Edge(id:6,startPoint: 4, endPoint: 5, cost: 1),
    Edge(id:7,startPoint: 4, endPoint: 7, cost: 1),
    Edge(id:8,startPoint: 5, endPoint: 6, cost: 1),
    Edge(id:9,startPoint: 6, endPoint: 7, cost: 1),
  ];

  final players = [P(id: 0, usedpoint: 0, score: 0, color: Colors.green),
    P(id: 1, usedpoint: 0, score: 0, color: Colors.blue),
    P(id: 2, usedpoint: 0, score: 0, color: Colors.red)];

  GameDataLoad.saveDocuments(
      collectionPath: "test1",
      gameID: "1",
      dataType: "Nodes",
      dataList: nodes,
      toMap: (data) => data.toMap()
  );

  GameDataLoad.saveDocuments(
      collectionPath: "test1",
      gameID: "1",
      dataType: "Edges",
      dataList: edges,
      toMap: (data) => data.toMap()
  );

  GameDataLoad.saveDocuments(
      collectionPath: "test1",
      gameID: "1",
      dataType: "Players",
      dataList: players,//playerのリストデータ
      toMap: (data) => data.toMap()
  );

   final player = GameDataLoad.getDocument<Node>(
       collectionPath: "test1",
       gameID: "1",
       dataType: "Nodes",
       documentID: "1",
       fromMap: (data) => Node.fromMap(data)
   );

   final player2 = await player;
   print(player2!.id);


  }

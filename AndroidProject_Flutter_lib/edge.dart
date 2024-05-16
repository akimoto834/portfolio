import 'dart:math';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:project/graph_painter.dart';
import 'package:flutter/cupertino.dart';
import 'graph_painter.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

import 'package:project/edge.dart';
import 'package:project/node.dart';
import "graph_painter.dart";
import 'package:cloud_firestore/cloud_firestore.dart';

final edgeProvider = StateProvider((ref) =>
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
]
);
//エッジを表すクラス
class Edge {
  final int id; //エッジのid
  final int startPoint; //エッジの始点ノード番号
  final int endPoint; //エッジの終点ノード番号
  int cost; //移動に必要なコスト

  Edge({required this.id,required this.startPoint, required this.endPoint, required this.cost});

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'startPoint': startPoint,
      'endPoint': endPoint,
      'cost': cost,
    };
  }

  factory Edge.fromMap(Map<String,dynamic>map){
    return Edge(
        id: map["id"],
        startPoint: map["startPoint"],
        endPoint: map["endPoint"],
        cost: map["cost"]);
    }
}

class EdgeWidget extends ConsumerWidget {
  int edge_id;//何番のノードか
  List<DocumentSnapshot> nodeDocuments;
  EdgeWidget({super.key, required this.edge_id, required this.nodeDocuments});
  @override
  Widget build(BuildContext context, WidgetRef ref) {

    return CustomPaint(
          painter: EdgePainter(nodeDocuments: nodeDocuments, edge: ref.watch(edgeProvider)[edge_id], cost: ref.watch(edgeProvider)[edge_id].cost)
    );
  }
}
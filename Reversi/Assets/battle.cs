using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

public class battle : MonoBehaviour
{
    public GameObject stone;
    public GameObject board;
    public TextMeshProUGUI turn_text;

    private int[,] data = new int[8, 8];//盤面が0(何もない）, 1(黒), -1(白）かを保持
    private bool turn = true;//trueが黒のターン　falseが白のターン　先行は黒
    // Start is called before the first frame update
    void Start()
    {
        for (int i = 0; i < 8; i++)
        {
            for(int j = 0; j < 8; j++)
            {
                GameObject board_obj = GameObject.Instantiate(board);
                board_obj.name = "board"+ Convert.ToString(i) + Convert.ToString(j);
                board_obj.transform.position = new UnityEngine.Vector3(i, 1, j);
                data[i, j] = 0;
            }
        }

        
        GameObject stone_obj = GameObject.Instantiate(stone);
        stone_obj.transform.position = new UnityEngine.Vector3(3, 1, 3);
        stone_obj.transform.Rotate(180, 0, 0, Space.World); // ワールドのX軸を中心に180°回転
        stone_obj.name = "stone" + Convert.ToString(3) + Convert.ToString(3);
        data[3, 3] = -1;//白

        stone_obj = GameObject.Instantiate(stone);
        stone_obj.transform.position = new UnityEngine.Vector3(4, 1, 3);
        stone_obj.name = "stone" + Convert.ToString(4) + Convert.ToString(3);
        data[4, 3] = 1;//黒
        
        stone_obj = GameObject.Instantiate(stone);
        stone_obj.transform.position = new UnityEngine.Vector3(3, 1, 4);
        stone_obj.name = "stone" + Convert.ToString(3) + Convert.ToString(4);
        data[3, 4] = 1;//黒

        stone_obj = GameObject.Instantiate(stone);
        stone_obj.transform.position = new UnityEngine.Vector3(4, 1, 4);
        stone_obj.transform.Rotate(180, 0, 0, Space.World); // ワールドのX軸を中心に180°回転
        stone_obj.name = "stone" + Convert.ToString(4) + Convert.ToString(4);
        data[4, 4] = -1;//白

        turn_text.text = "turn of black";
    }
    //1.MainCameraにPhysics 2D Raycaster追加
    //2.EventSystemの追加
    //3.クリックされるオブジェクトにboxcollidor追加 EventTriggarも追加
    //4.EventTriggarに関数追加

    public void OnClick(BaseEventData data)//クリック時の処理　引数はEventTriggarのPointerClick(BaseEventData)より
    {
    }

    public bool can_put(int x, int z, bool turn)//駒を置くことができるかの判定
    {
        if (data[x, z] == 0)//まだ何も置かれていない
        {
            List<(int, int)> reverse_list = new List<(int, int)>();  
            bool put=false;
            if (turn)//黒のターンの場合　黒の駒が置けるかを判定する
            {          
                //上方向
                for(int i = x-1; i >= 0; i--)
                {
                    if(data[i, z] == 1)//黒の駒なら
                    {
                        break;
                    }
                    else if (data[i, z] == -1)//白の駒なら
                    {
                       reverse_list.Add((i, z));
                        if (i == 0)
                        {
                            reverse_list.Clear();
                        }
                    }
                    else
                    {
                        reverse_list.Clear();
                        break;
                    }
                }
                foreach((int, int) reverse in reverse_list)
                {
                    data[reverse.Item1, reverse.Item2] = 1;
                    GameObject obj = GameObject.Find("stone" + Convert.ToString(reverse.Item1) + Convert.ToString(reverse.Item2));
                    obj.transform.Rotate(180, 0, 0, Space.World);
                    put = true;
                }
                reverse_list.Clear();

                //右上方向
                if(x >= 7-z)
                {
                    int i = x-1;
                    for(int j = z+1; j <=7; j++)
                    {
                        if (data[i, j] == 1)//黒の駒なら
                        {
                            break;
                        }
                        else if (data[i, j] == -1)//白の駒なら
                        {
                            reverse_list.Add((i, j));
                            if (j == 7)
                            {
                                reverse_list.Clear();
                            }
                        }
                        else
                        {
                            reverse_list.Clear();
                            break;
                        }
                        i--;
                    }
                    foreach ((int, int) reverse in reverse_list)
                    {
                        data[reverse.Item1, reverse.Item2] = 1;
                        GameObject obj = GameObject.Find("stone" + Convert.ToString(reverse.Item1) + Convert.ToString(reverse.Item2));
                        obj.transform.Rotate(180, 0, 0, Space.World);
                        put = true;
                    }
                    reverse_list.Clear();

                }
                else
                {
                    int j = z + 1;
                    for (int i = x - 1; i >= 0 ; i--)
                    {
                        if (data[i, j] == 1)//黒の駒なら
                        {
                            break;
                        }
                        else if (data[i, j] == -1)//白の駒なら
                        {
                            reverse_list.Add((i, j));
                            if (i == 0)
                            {
                                reverse_list.Clear();
                            }
                        }
                        else
                        {
                            reverse_list.Clear();
                            break;
                        }
                        j++;
                    }
                    foreach ((int, int) reverse in reverse_list)
                    {
                        data[reverse.Item1, reverse.Item2] = 1;
                        GameObject obj = GameObject.Find("stone" + Convert.ToString(reverse.Item1) + Convert.ToString(reverse.Item2));
                        obj.transform.Rotate(180, 0, 0, Space.World);
                        put = true;
                    }
                    reverse_list.Clear();
                }


                //右方向
                for (int i = z+1; i<=7; i++)
                {
                    if (data[x, i] == 1)//黒の駒なら
                    {
                        break;
                    }
                    else if (data[x, i] == -1)//白の駒なら
                    {
                        reverse_list.Add((x, i));
                        if (i == 7)
                        {
                            reverse_list.Clear();
                        }
                    }
                    else
                    {
                        reverse_list.Clear();
                        break;
                    }
                }
                foreach ((int, int) reverse in reverse_list)
                {
                    data[reverse.Item1, reverse.Item2] = 1;
                    GameObject obj = GameObject.Find("stone" + Convert.ToString(reverse.Item1) + Convert.ToString(reverse.Item2));
                    obj.transform.Rotate(180, 0, 0, Space.World);
                    put = true;
                }
                reverse_list.Clear();
                //右下方向
                if (7-x >= 7-z)
                {
                    int i = x + 1;
                    for (int j = z + 1; j <= 7; j++)
                    {
                        if (data[i, j] == 1)//黒の駒なら
                        {
                            break;
                        }
                        else if (data[i, j] == -1)//白の駒なら
                        {
                            reverse_list.Add((i, j));
                            if (j == 7)
                            {
                                reverse_list.Clear();
                            }
                        }
                        else
                        {
                            reverse_list.Clear();
                            break;
                        }
                        i++;
                    }
                    foreach ((int, int) reverse in reverse_list)
                    {
                        data[reverse.Item1, reverse.Item2] = 1;
                        GameObject obj = GameObject.Find("stone" + Convert.ToString(reverse.Item1) + Convert.ToString(reverse.Item2));
                        obj.transform.Rotate(180, 0, 0, Space.World);
                        put = true;
                    }
                    reverse_list.Clear();

                }
                else
                {
                    int j = z + 1;
                    for (int i = x + 1; i <= 7; i++)
                    {
                        if (data[i, j] == 1)//黒の駒なら
                        {
                            break;
                        }
                        else if (data[i, j] == -1)//白の駒なら
                        {
                            reverse_list.Add((i, j));
                            if (i == 7)
                            {
                                reverse_list.Clear();
                            }
                        }
                        else
                        {
                            reverse_list.Clear();
                            break;
                        }
                        j++;
                    }
                    foreach ((int, int) reverse in reverse_list)
                    {
                        data[reverse.Item1, reverse.Item2] = 1;
                        GameObject obj = GameObject.Find("stone" + Convert.ToString(reverse.Item1) + Convert.ToString(reverse.Item2));
                        obj.transform.Rotate(180, 0, 0, Space.World);
                        put = true;
                    }
                    reverse_list.Clear();
                }
                //下方向
                for (int i = x + 1; i <= 7; i++)
                {
                    if (data[i, z] == 1)//黒の駒なら
                    {
                        break;
                    }
                    else if (data[i, z] == -1)//白の駒なら
                    {
                        reverse_list.Add((i, z));
                        if (i == 7)
                        {
                            reverse_list.Clear();
                        }
                    }
                    else
                    {
                        reverse_list.Clear();
                        break;
                    }
                }
                foreach ((int, int) reverse in reverse_list)
                {
                    data[reverse.Item1, reverse.Item2] = 1;
                    GameObject obj = GameObject.Find("stone" + Convert.ToString(reverse.Item1) + Convert.ToString(reverse.Item2));
                    obj.transform.Rotate(180, 0, 0, Space.World);
                    put = true;
                }
                reverse_list.Clear();

                //左下方向
                if (7 - x >= z)
                {
                    int i = x + 1;
                    for (int j = z - 1; j >= 0; j--)
                    {
                        if (data[i, j] == 1)//黒の駒なら
                        {
                            break;
                        }
                        else if (data[i, j] == -1)//白の駒なら
                        {
                            reverse_list.Add((i, j));
                            if (j == 0)
                            {
                                reverse_list.Clear();
                            }
                        }
                        else
                        {
                            reverse_list.Clear();
                            break;
                        }
                        i++;
                    }
                    foreach ((int, int) reverse in reverse_list)
                    {
                        data[reverse.Item1, reverse.Item2] = 1;
                        GameObject obj = GameObject.Find("stone" + Convert.ToString(reverse.Item1) + Convert.ToString(reverse.Item2));
                        obj.transform.Rotate(180, 0, 0, Space.World);
                        put = true;
                    }
                    reverse_list.Clear();

                }
                else
                {
                    int j = z - 1;
                    for (int i = x + 1; i <= 7; i++)
                    {
                        if (data[i, j] == 1)//黒の駒なら
                        {
                            break;
                        }
                        else if (data[i, j] == -1)//白の駒なら
                        {
                            reverse_list.Add((i, j));
                            if (i == 7)
                            {
                                reverse_list.Clear();
                            }
                        }
                        else
                        {
                            reverse_list.Clear();
                            break;
                        }
                        j--;
                    }
                    foreach ((int, int) reverse in reverse_list)
                    {
                        data[reverse.Item1, reverse.Item2] = 1;
                        GameObject obj = GameObject.Find("stone" + Convert.ToString(reverse.Item1) + Convert.ToString(reverse.Item2));
                        obj.transform.Rotate(180, 0, 0, Space.World);
                        put = true;
                    }
                    reverse_list.Clear();
                }
                //左方向
                for (int i = z - 1; i >= 0; i--)
                {
                    if (data[x, i] == 1)//黒の駒なら
                    {
                        break;
                    }
                    else if (data[x, i] == -1)//白の駒なら
                    {
                        reverse_list.Add((x, i));
                        if (i == 0)
                        {
                            reverse_list.Clear();
                        }
                    }
                    else
                    {
                        reverse_list.Clear();
                        break;
                    }
                }
                foreach ((int, int) reverse in reverse_list)
                {
                    data[reverse.Item1, reverse.Item2] = 1;
                    GameObject obj = GameObject.Find("stone" + Convert.ToString(reverse.Item1) + Convert.ToString(reverse.Item2));
                    obj.transform.Rotate(180, 0, 0, Space.World);
                    put = true;
                }
                reverse_list.Clear();
                //左上方向
                if (x >= z)
                {
                    int i = x - 1;
                    for (int j = z - 1; j >= 0; j--)
                    {
                        if (data[i, j] == 1)//黒の駒なら
                        {
                            break;
                        }
                        else if (data[i, j] == -1)//白の駒なら
                        {
                            reverse_list.Add((i, j));
                            if (j == 0)
                            {
                                reverse_list.Clear();
                            }
                        }
                        else
                        {
                            reverse_list.Clear();
                            break;
                        }
                        i--;
                    }
                    foreach ((int, int) reverse in reverse_list)
                    {
                        data[reverse.Item1, reverse.Item2] = 1;
                        GameObject obj = GameObject.Find("stone" + Convert.ToString(reverse.Item1) + Convert.ToString(reverse.Item2));
                        obj.transform.Rotate(180, 0, 0, Space.World);
                        put = true;
                    }
                    reverse_list.Clear();

                }
                else
                {
                    int j = z - 1;
                    for (int i = x - 1; i >= 0; i--)
                    {
                        if (data[i, j] == 1)//黒の駒なら
                        {
                            break;
                        }
                        else if (data[i, j] == -1)//白の駒なら
                        {
                            reverse_list.Add((i, j));
                            if (i == 0)
                            {
                                reverse_list.Clear();
                            }
                        }
                        else
                        {
                            reverse_list.Clear();
                            break;
                        }
                        j--;
                    }
                    foreach ((int, int) reverse in reverse_list)
                    {
                        data[reverse.Item1, reverse.Item2] = 1;
                        GameObject obj = GameObject.Find("stone" + Convert.ToString(reverse.Item1) + Convert.ToString(reverse.Item2));
                        obj.transform.Rotate(180, 0, 0, Space.World);
                        put = true;
                    }
                    reverse_list.Clear();
                }
            }
            else//白のターンの場合
            {
                //上方向
                for (int i = x - 1; i >= 0; i--)
                {
                    if (data[i, z] == -1)//白の駒なら
                    {
                        break;
                    }
                    else if (data[i, z] == 1)//黒の駒なら
                    {
                        reverse_list.Add((i, z));
                        if (i == 0)
                        {
                            reverse_list.Clear();
                        }
                    }
                    else
                    {
                        reverse_list.Clear();
                        break;
                    }
                }
                foreach ((int, int) reverse in reverse_list)
                {
                    data[reverse.Item1, reverse.Item2] = -1;
                    GameObject obj = GameObject.Find("stone" + Convert.ToString(reverse.Item1) + Convert.ToString(reverse.Item2));
                    obj.transform.Rotate(180, 0, 0, Space.World);
                    put = true;
                }
                reverse_list.Clear();

                //右上方向
                if (x >= 7 - z)
                {
                    int i = x - 1;
                    for (int j = z + 1; j <= 7; j++)
                    {
                        if (data[i, j] == -1)//白の駒なら
                        {
                            break;
                        }
                        else if (data[i, j] == 1)//黒の駒なら
                        {
                            reverse_list.Add((i, j));
                            if (j == 7)
                            {
                                reverse_list.Clear();
                            }
                        }
                        else
                        {
                            reverse_list.Clear();
                            break;
                        }
                        i--;
                    }
                    foreach ((int, int) reverse in reverse_list)
                    {
                        data[reverse.Item1, reverse.Item2] = -1;
                        GameObject obj = GameObject.Find("stone" + Convert.ToString(reverse.Item1) + Convert.ToString(reverse.Item2));
                        obj.transform.Rotate(180, 0, 0, Space.World);
                        put = true;
                    }
                    reverse_list.Clear();

                }
                else
                {
                    int j = z + 1;
                    for (int i = x - 1; i >= 0; i--)
                    {
                        if (data[i, j] == -1)//白の駒なら
                        {
                            break;
                        }
                        else if (data[i, j] == 1)//黒の駒なら
                        {
                            reverse_list.Add((i, j));
                            if (i == 0)
                            {
                                reverse_list.Clear();
                            }
                        }
                        else
                        {
                            reverse_list.Clear();
                            break;
                        }
                        j++;
                    }
                    foreach ((int, int) reverse in reverse_list)
                    {
                        data[reverse.Item1, reverse.Item2] = -1;
                        GameObject obj = GameObject.Find("stone" + Convert.ToString(reverse.Item1) + Convert.ToString(reverse.Item2));
                        obj.transform.Rotate(180, 0, 0, Space.World);
                        put = true;
                    }
                    reverse_list.Clear();
                }


                //右方向
                for (int i = z + 1; i <= 7; i++)
                {
                    if (data[x, i] == -1)//白の駒なら
                    {
                        break;
                    }
                    else if (data[x, i] == 1)//黒の駒なら
                    {
                        reverse_list.Add((x, i));
                        if (i == 7)
                        {
                            reverse_list.Clear();
                        }
                    }
                    else
                    {
                        reverse_list.Clear();
                        break;
                    }
                }
                foreach ((int, int) reverse in reverse_list)
                {
                    data[reverse.Item1, reverse.Item2] = -1;
                    GameObject obj = GameObject.Find("stone" + Convert.ToString(reverse.Item1) + Convert.ToString(reverse.Item2));
                    obj.transform.Rotate(180, 0, 0, Space.World);
                    put = true;
                }
                reverse_list.Clear();
                //右下方向
                if (7 - x >= 7 - z)
                {
                    int i = x + 1;
                    for (int j = z + 1; j <= 7; j++)
                    {
                        if (data[i, j] == -1)//白の駒なら
                        {
                            break;
                        }
                        else if (data[i, j] == 1)//黒の駒なら
                        {
                            reverse_list.Add((i, j));
                            if (j == 7)
                            {
                                reverse_list.Clear();
                            }
                        }
                        else
                        {
                            reverse_list.Clear();
                            break;
                        }
                        i++;
                    }
                    foreach ((int, int) reverse in reverse_list)
                    {
                        data[reverse.Item1, reverse.Item2] = -1;
                        GameObject obj = GameObject.Find("stone" + Convert.ToString(reverse.Item1) + Convert.ToString(reverse.Item2));
                        obj.transform.Rotate(180, 0, 0, Space.World);
                        put = true;
                    }
                    reverse_list.Clear();

                }
                else
                {
                    int j = z + 1;
                    for (int i = x + 1; i <= 7; i++)
                    {
                        if (data[i, j] == -1)//白の駒なら
                        {
                            break;
                        }
                        else if (data[i, j] == 1)//黒の駒なら
                        {
                            reverse_list.Add((i, j));
                            if (i == 7)
                            {
                                reverse_list.Clear();
                            }
                        }
                        else
                        {
                            reverse_list.Clear();
                            break;
                        }
                        j++;
                    }
                    foreach ((int, int) reverse in reverse_list)
                    {
                        data[reverse.Item1, reverse.Item2] = -1;
                        GameObject obj = GameObject.Find("stone" + Convert.ToString(reverse.Item1) + Convert.ToString(reverse.Item2));
                        obj.transform.Rotate(180, 0, 0, Space.World);
                        put = true;
                    }
                    reverse_list.Clear();
                }
                //下方向
                for (int i = x + 1; i <= 7; i++)
                {
                    if (data[i, z] == -1)//白の駒なら
                    {
                        break;
                    }
                    else if (data[i, z] == 1)//黒の駒なら
                    {
                        reverse_list.Add((i, z));
                        if (i == 7)
                        {
                            reverse_list.Clear();
                        }
                    }
                    else
                    {
                        reverse_list.Clear();
                        break;
                    }
                }
                foreach ((int, int) reverse in reverse_list)
                {
                    data[reverse.Item1, reverse.Item2] = -1;
                    GameObject obj = GameObject.Find("stone" + Convert.ToString(reverse.Item1) + Convert.ToString(reverse.Item2));
                    obj.transform.Rotate(180, 0, 0, Space.World);
                    put = true;
                }
                reverse_list.Clear();

                //左下方向
                if (7 - x >= z)
                {
                    int i = x + 1;
                    for (int j = z - 1; j >= 0; j--)
                    {
                        if (data[i, j] == -1)//白の駒なら
                        {
                            break;
                        }
                        else if (data[i, j] == 1)//黒の駒なら
                        {
                            reverse_list.Add((i, j));
                            if (j == 0)
                            {
                                reverse_list.Clear();
                            }
                        }
                        else
                        {
                            reverse_list.Clear();
                            break;
                        }
                        i++;
                    }
                    foreach ((int, int) reverse in reverse_list)
                    {
                        data[reverse.Item1, reverse.Item2] = -1;
                        GameObject obj = GameObject.Find("stone" + Convert.ToString(reverse.Item1) + Convert.ToString(reverse.Item2));
                        obj.transform.Rotate(180, 0, 0, Space.World);
                        put = true;
                    }
                    reverse_list.Clear();

                }
                else
                {
                    int j = z - 1;
                    for (int i = x + 1; i <= 7; i++)
                    {
                        if (data[i, j] == -1)//白の駒なら
                        {
                            break;
                        }
                        else if (data[i, j] == 1)//黒の駒なら
                        {
                            reverse_list.Add((i, j));
                            if (i == 7)
                            {
                                reverse_list.Clear();
                            }
                        }
                        else
                        {
                            reverse_list.Clear();
                            break;
                        }
                        j--;
                    }
                    foreach ((int, int) reverse in reverse_list)
                    {
                        data[reverse.Item1, reverse.Item2] = -1;
                        GameObject obj = GameObject.Find("stone" + Convert.ToString(reverse.Item1) + Convert.ToString(reverse.Item2));
                        obj.transform.Rotate(180, 0, 0, Space.World);
                        put = true;
                    }
                    reverse_list.Clear();
                }
                //左方向
                for (int i = z - 1; i >= 0; i--)
                {
                    if (data[x, i] == -1)//白の駒なら
                    {
                        break;
                    }
                    else if (data[x, i] == 1)//黒の駒なら
                    {
                        reverse_list.Add((x, i));
                        if (i == 0)
                        {
                            reverse_list.Clear();
                        }
                    }
                    else
                    {
                        reverse_list.Clear();
                        break;
                    }
                }
                foreach ((int, int) reverse in reverse_list)
                {
                    data[reverse.Item1, reverse.Item2] = -1;
                    GameObject obj = GameObject.Find("stone" + Convert.ToString(reverse.Item1) + Convert.ToString(reverse.Item2));
                    obj.transform.Rotate(180, 0, 0, Space.World);
                    put = true;
                }
                reverse_list.Clear();
                //左上方向
                if (x >= z)
                {
                    int i = x - 1;
                    for (int j = z - 1; j >= 0; j--)
                    {
                        if (data[i, j] == -1)//白の駒なら
                        {
                            break;
                        }
                        else if (data[i, j] == 1)//黒の駒なら
                        {
                            reverse_list.Add((i, j));
                            if (j == 0)
                            {
                                reverse_list.Clear();
                            }
                        }
                        else
                        {
                            reverse_list.Clear();
                            break;
                        }
                        i--;
                    }
                    foreach ((int, int) reverse in reverse_list)
                    {
                        data[reverse.Item1, reverse.Item2] = -1;
                        GameObject obj = GameObject.Find("stone" + Convert.ToString(reverse.Item1) + Convert.ToString(reverse.Item2));
                        obj.transform.Rotate(180, 0, 0, Space.World);
                        put = true;
                    }
                    reverse_list.Clear();

                }
                else
                {
                    int j = z - 1;
                    for (int i = x - 1; i >= 0; i--)
                    {
                        if (data[i, j] == -1)//白の駒なら
                        {
                            break;
                        }
                        else if (data[i, j] == 1)//黒の駒なら
                        {
                            reverse_list.Add((i, j));
                            if (i == 0)
                            {
                                reverse_list.Clear();
                            }
                        }
                        else
                        {
                            reverse_list.Clear();
                            break;
                        }
                        j--;
                    }
                    foreach ((int, int) reverse in reverse_list)
                    {
                        data[reverse.Item1, reverse.Item2] = -1;
                        GameObject obj = GameObject.Find("stone" + Convert.ToString(reverse.Item1) + Convert.ToString(reverse.Item2));
                        obj.transform.Rotate(180, 0, 0, Space.World);
                        put = true;
                    }
                    reverse_list.Clear();
                }
            }
            return put;
        }
        else
        {
            return false;
        }
        
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetMouseButtonDown(0))//左クリック
        {

            GameObject clickedGameObject = null;

            Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);//cameraからマウスのクリック位置へのレイ
            RaycastHit hit = new RaycastHit();

            if (Physics.Raycast(ray, out hit))
            {
                clickedGameObject = hit.collider.gameObject;
            }

            if(clickedGameObject != null)
            {
                int x = (int)clickedGameObject.transform.position.x;
                int z = (int)clickedGameObject.transform.position.z;

                if (can_put(x, z, turn))
                {
                    if (turn)//黒のターンの場合
                    {
                        GameObject stone_obj = GameObject.Instantiate(stone);
                        stone_obj.transform.position = new UnityEngine.Vector3(x, 1, z);
                        stone_obj.name = "stone" + Convert.ToString(x) + Convert.ToString(z);
                        data[x, z] = 1;//黒
                        turn = false;
                        turn_text.text = "turn of white";
                    }
                    else//白のターンの場合
                    {
                        GameObject stone_obj = GameObject.Instantiate(stone);
                        stone_obj.transform.position = new UnityEngine.Vector3(x, 1, z);
                        stone_obj.name = "stone" + Convert.ToString(x) + Convert.ToString(z);
                        stone_obj.transform.Rotate(180, 0, 0, Space.World); // ワールドのX軸を中心に180°回転
                        data[x, z] = -1;//白
                        turn = true;
                        turn_text.text = "turn of black";
                    }
                }
                else
                {
                    Debug.Log("ここには置けません");
                }
            }
            else
            {
                Debug.Log("ここには置けません");
            }
            
        }

    }
}

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

    private int[,] data = new int[8, 8];//�Ֆʂ�0(�����Ȃ��j, 1(��), -1(���j����ێ�
    private bool turn = true;//true�����̃^�[���@false�����̃^�[���@��s�͍�
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
        stone_obj.transform.Rotate(180, 0, 0, Space.World); // ���[���h��X���𒆐S��180����]
        stone_obj.name = "stone" + Convert.ToString(3) + Convert.ToString(3);
        data[3, 3] = -1;//��

        stone_obj = GameObject.Instantiate(stone);
        stone_obj.transform.position = new UnityEngine.Vector3(4, 1, 3);
        stone_obj.name = "stone" + Convert.ToString(4) + Convert.ToString(3);
        data[4, 3] = 1;//��
        
        stone_obj = GameObject.Instantiate(stone);
        stone_obj.transform.position = new UnityEngine.Vector3(3, 1, 4);
        stone_obj.name = "stone" + Convert.ToString(3) + Convert.ToString(4);
        data[3, 4] = 1;//��

        stone_obj = GameObject.Instantiate(stone);
        stone_obj.transform.position = new UnityEngine.Vector3(4, 1, 4);
        stone_obj.transform.Rotate(180, 0, 0, Space.World); // ���[���h��X���𒆐S��180����]
        stone_obj.name = "stone" + Convert.ToString(4) + Convert.ToString(4);
        data[4, 4] = -1;//��

        turn_text.text = "turn of black";
    }
    //1.MainCamera��Physics 2D Raycaster�ǉ�
    //2.EventSystem�̒ǉ�
    //3.�N���b�N�����I�u�W�F�N�g��boxcollidor�ǉ� EventTriggar���ǉ�
    //4.EventTriggar�Ɋ֐��ǉ�

    public void OnClick(BaseEventData data)//�N���b�N���̏����@������EventTriggar��PointerClick(BaseEventData)���
    {
    }

    public bool can_put(int x, int z, bool turn)//���u�����Ƃ��ł��邩�̔���
    {
        if (data[x, z] == 0)//�܂������u����Ă��Ȃ�
        {
            List<(int, int)> reverse_list = new List<(int, int)>();  
            bool put=false;
            if (turn)//���̃^�[���̏ꍇ�@���̋�u���邩�𔻒肷��
            {          
                //�����
                for(int i = x-1; i >= 0; i--)
                {
                    if(data[i, z] == 1)//���̋�Ȃ�
                    {
                        break;
                    }
                    else if (data[i, z] == -1)//���̋�Ȃ�
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

                //�E�����
                if(x >= 7-z)
                {
                    int i = x-1;
                    for(int j = z+1; j <=7; j++)
                    {
                        if (data[i, j] == 1)//���̋�Ȃ�
                        {
                            break;
                        }
                        else if (data[i, j] == -1)//���̋�Ȃ�
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
                        if (data[i, j] == 1)//���̋�Ȃ�
                        {
                            break;
                        }
                        else if (data[i, j] == -1)//���̋�Ȃ�
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


                //�E����
                for (int i = z+1; i<=7; i++)
                {
                    if (data[x, i] == 1)//���̋�Ȃ�
                    {
                        break;
                    }
                    else if (data[x, i] == -1)//���̋�Ȃ�
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
                //�E������
                if (7-x >= 7-z)
                {
                    int i = x + 1;
                    for (int j = z + 1; j <= 7; j++)
                    {
                        if (data[i, j] == 1)//���̋�Ȃ�
                        {
                            break;
                        }
                        else if (data[i, j] == -1)//���̋�Ȃ�
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
                        if (data[i, j] == 1)//���̋�Ȃ�
                        {
                            break;
                        }
                        else if (data[i, j] == -1)//���̋�Ȃ�
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
                //������
                for (int i = x + 1; i <= 7; i++)
                {
                    if (data[i, z] == 1)//���̋�Ȃ�
                    {
                        break;
                    }
                    else if (data[i, z] == -1)//���̋�Ȃ�
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

                //��������
                if (7 - x >= z)
                {
                    int i = x + 1;
                    for (int j = z - 1; j >= 0; j--)
                    {
                        if (data[i, j] == 1)//���̋�Ȃ�
                        {
                            break;
                        }
                        else if (data[i, j] == -1)//���̋�Ȃ�
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
                        if (data[i, j] == 1)//���̋�Ȃ�
                        {
                            break;
                        }
                        else if (data[i, j] == -1)//���̋�Ȃ�
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
                //������
                for (int i = z - 1; i >= 0; i--)
                {
                    if (data[x, i] == 1)//���̋�Ȃ�
                    {
                        break;
                    }
                    else if (data[x, i] == -1)//���̋�Ȃ�
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
                //�������
                if (x >= z)
                {
                    int i = x - 1;
                    for (int j = z - 1; j >= 0; j--)
                    {
                        if (data[i, j] == 1)//���̋�Ȃ�
                        {
                            break;
                        }
                        else if (data[i, j] == -1)//���̋�Ȃ�
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
                        if (data[i, j] == 1)//���̋�Ȃ�
                        {
                            break;
                        }
                        else if (data[i, j] == -1)//���̋�Ȃ�
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
            else//���̃^�[���̏ꍇ
            {
                //�����
                for (int i = x - 1; i >= 0; i--)
                {
                    if (data[i, z] == -1)//���̋�Ȃ�
                    {
                        break;
                    }
                    else if (data[i, z] == 1)//���̋�Ȃ�
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

                //�E�����
                if (x >= 7 - z)
                {
                    int i = x - 1;
                    for (int j = z + 1; j <= 7; j++)
                    {
                        if (data[i, j] == -1)//���̋�Ȃ�
                        {
                            break;
                        }
                        else if (data[i, j] == 1)//���̋�Ȃ�
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
                        if (data[i, j] == -1)//���̋�Ȃ�
                        {
                            break;
                        }
                        else if (data[i, j] == 1)//���̋�Ȃ�
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


                //�E����
                for (int i = z + 1; i <= 7; i++)
                {
                    if (data[x, i] == -1)//���̋�Ȃ�
                    {
                        break;
                    }
                    else if (data[x, i] == 1)//���̋�Ȃ�
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
                //�E������
                if (7 - x >= 7 - z)
                {
                    int i = x + 1;
                    for (int j = z + 1; j <= 7; j++)
                    {
                        if (data[i, j] == -1)//���̋�Ȃ�
                        {
                            break;
                        }
                        else if (data[i, j] == 1)//���̋�Ȃ�
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
                        if (data[i, j] == -1)//���̋�Ȃ�
                        {
                            break;
                        }
                        else if (data[i, j] == 1)//���̋�Ȃ�
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
                //������
                for (int i = x + 1; i <= 7; i++)
                {
                    if (data[i, z] == -1)//���̋�Ȃ�
                    {
                        break;
                    }
                    else if (data[i, z] == 1)//���̋�Ȃ�
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

                //��������
                if (7 - x >= z)
                {
                    int i = x + 1;
                    for (int j = z - 1; j >= 0; j--)
                    {
                        if (data[i, j] == -1)//���̋�Ȃ�
                        {
                            break;
                        }
                        else if (data[i, j] == 1)//���̋�Ȃ�
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
                        if (data[i, j] == -1)//���̋�Ȃ�
                        {
                            break;
                        }
                        else if (data[i, j] == 1)//���̋�Ȃ�
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
                //������
                for (int i = z - 1; i >= 0; i--)
                {
                    if (data[x, i] == -1)//���̋�Ȃ�
                    {
                        break;
                    }
                    else if (data[x, i] == 1)//���̋�Ȃ�
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
                //�������
                if (x >= z)
                {
                    int i = x - 1;
                    for (int j = z - 1; j >= 0; j--)
                    {
                        if (data[i, j] == -1)//���̋�Ȃ�
                        {
                            break;
                        }
                        else if (data[i, j] == 1)//���̋�Ȃ�
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
                        if (data[i, j] == -1)//���̋�Ȃ�
                        {
                            break;
                        }
                        else if (data[i, j] == 1)//���̋�Ȃ�
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
        if (Input.GetMouseButtonDown(0))//���N���b�N
        {

            GameObject clickedGameObject = null;

            Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);//camera����}�E�X�̃N���b�N�ʒu�ւ̃��C
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
                    if (turn)//���̃^�[���̏ꍇ
                    {
                        GameObject stone_obj = GameObject.Instantiate(stone);
                        stone_obj.transform.position = new UnityEngine.Vector3(x, 1, z);
                        stone_obj.name = "stone" + Convert.ToString(x) + Convert.ToString(z);
                        data[x, z] = 1;//��
                        turn = false;
                        turn_text.text = "turn of white";
                    }
                    else//���̃^�[���̏ꍇ
                    {
                        GameObject stone_obj = GameObject.Instantiate(stone);
                        stone_obj.transform.position = new UnityEngine.Vector3(x, 1, z);
                        stone_obj.name = "stone" + Convert.ToString(x) + Convert.ToString(z);
                        stone_obj.transform.Rotate(180, 0, 0, Space.World); // ���[���h��X���𒆐S��180����]
                        data[x, z] = -1;//��
                        turn = true;
                        turn_text.text = "turn of black";
                    }
                }
                else
                {
                    Debug.Log("�����ɂ͒u���܂���");
                }
            }
            else
            {
                Debug.Log("�����ɂ͒u���܂���");
            }
            
        }

    }
}

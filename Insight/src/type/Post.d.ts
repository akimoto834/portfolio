declare type Post = {
    readonly id : number;
    user_id : number;
    body : string;
    title: string;
    epi: number;//何話に関する投稿か
    userNewEpi: number//投稿時点で投稿者は何話まで読んでいたか
    father_id: number;
    time: string
    reply: boolean;//返信欄を開いてるか
}
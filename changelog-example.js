// 版本配置示例 - 包含详细更新日志
const CONFIG_EXAMPLE = {
    VERSIONS: {
        '1.1.9': {
            date: '2024-11-20',
            changelog: `关于更新
1.. 在ChartingState中，你可以使用右键拖动已经放置了的箭头和事件，手机版需要按下L键切换为移动箭头模式。并且这里面的ui改成了仿PsychEngine1.0。
2.. 在预加载界面中左下角加入了Tags，也叫JustSay（什么是JustSay?）。并且右上角有个加载圆圈，你可以参照他有没有转动来判断当前游戏是否已经卡死。
3.. CopyState现在将会替换掉所有跟内部资源（占用内存大小）不符合的文件，如果你更改了一些贴图，请做好备份。（或者把你更改的assets贴图移动到mods的相对路径下
比如说assets/images/menuExtend/watermark.png 放到 mods/images/menuExtend/watermark.png）
4..freeplay的难度计算重写，模仿osu! 的星级（测试中！！）
仅供参考:
Easy: 0.0★–1.99★
Normal: 2.0★–3.99★
Hard: 4.0★–5.99★
Insane: 6.0★–7.99★
Expert: 8.0★–10+★
5.. 如果位于assets/shared/version.txt里的版本号跟你目前的游戏版本号不一样那么将会强制启动文件复制，因为有些人更新游戏后没在设置启动文件自动复制功能，导致一系列问题发生。
6.. 主菜单右上角会显示NovaFlare-Engine的github的action最后一次更新时间（这个信息并不代表你当前游玩的版本会有这些更新，只是给你参考一下看看NovaFlare有多久没更新了，要联网）
7..允许开启或关闭运存自动清理
8..暂停界面在关闭时已无延迟
9..FreeplayState优化
10..OptionState优化
11..现在已支持psych1.0里stage编辑器制作的json读取
12..对titleState和playState异常视频结尾显示问题进行修复
13..解决了replay弹出崩溃问题
14..对底层代码进行优化`,
            downloads: [
                {
                    name: '小飞机网盘',
                    link: 'https://share.feijipan.com/s/NmOXKi8C?code=NFEG',
                    code: 'NFEG',
                    tags: [
                        { class: 'tag-blue', text: '推荐' },
                        { class: 'tag-green', text: '稳定' },
                        { class: 'tag-green', text: '免登录' }
                    ]
                }
            ]
        }
    }
};

// 导出示例配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG_EXAMPLE;
} else if (typeof window !== 'undefined') {
    window.CONFIG_EXAMPLE = CONFIG_EXAMPLE;
}

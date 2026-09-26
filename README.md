# system-development-skills

プロジェクトを問わず使い回すClaude Codeのスキルを集めたプラグイン／マーケットプレイスリポジトリ．

## 収録スキル

- `finalize-artifacts`: 成果物(ドキュメント，コード，コミットメッセージなど)を，会話の経緯を知らない読み手向けに仕上げる手順．
- `build-handson`: 学習者が1つのプログラムをIterationごとにテスト駆動で育てるハンズオン教材を，対象者・題材・設計書をユーザーと決めてから作る手順．

## 参照する側の設定

利用するリポジトリの`.claude/settings.json`に，次のように追記する．

```json
{
  "extraKnownMarketplaces": {
    "system-development-skills": {
      "source": {
        "source": "github",
        "repo": "enunun/system-development-skills"
      }
    }
  },
  "enabledPlugins": {
    "system-development-skills@system-development-skills": true
  }
}
```

設定を追記しただけでは，スキルは使えるようにならない．
Claude Codeの「Manage plugins」メニューを開き，`system-development-skills`プラグインを明示的に追加する．

有効化されたスキルは，`system-development-skills:finalize-artifacts`のように，`プラグイン名:スキル名`の形で呼び出される．

## スキルを追加する

スキルを追加するときは，`skills/<skill-name>/SKILL.md`を作り，「収録スキル」の一覧に1行足す．
プラグインの扱う範囲が変わるときは，`.claude-plugin/marketplace.json`と`plugin.json`のdescriptionも書き換える．

このリポジトリでは，`.claude/skills`を`skills/`へのシンボリックリンクにしている．
スキルはプロジェクトのスキルとして，`finalize-artifacts`のような名前で読み込まれる．
編集中のスキルを，pushする前にこのリポジトリの中で試せる．

## 開発環境

VSCodeのDev Containersで開く(「Reopen in Container」)．
コンテナにはmise，rtk，lefthookが入っている．
初回の起動時に`mise run setup`を実行し，依存パッケージとGitのフックを設定する．

| コマンド | 内容 |
| --- | --- |
| `mise run lint` | スキルのMarkdown(`skills/`)をtextlintとmarkdownlintで検査する． |
| `mise run fmt` | 自動で直せる指摘を直す． |
| `mise run check` | すべての検査をまとめて実行する．変更のあとに実行する． |

コミット時には，lefthookがステージしたスキルのMarkdownファイルを同じ設定で検査する．

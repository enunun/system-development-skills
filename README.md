# system-development-skills

プロジェクトを問わず使い回すClaude Codeのスキルを集めたプラグイン／マーケットプレイスリポジトリ．

## 収録スキル

- `finalize-artifacts`: 成果物(ドキュメント，コード，コミットメッセージなど)を，会話の経緯を知らない読み手向けに仕上げる手順．

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

有効化されたスキルは，`system-development-skills:finalize-artifacts`のように，`プラグイン名:スキル名`の形で呼び出される．

## スキルを追加する

`skills/<skill-name>/SKILL.md`を追加し，`.claude-plugin/marketplace.json`と`plugin.json`のdescriptionを必要に応じて更新する．

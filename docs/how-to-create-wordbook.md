# 如何创建单词本

虽然我们准备了一系列的单词本，但并不能涵盖所有学习需求，所以我们为你准备了工具让你可能自己创建单词本以满足你的学习需求。

## 安装 CLI 工具
```bash
$ npm install -g wordway-cli
```

或

```bash
$ npm install -g git+https://github.com/wordway/wordway-cli.git
```

现在，您可以使用以下命令在任何位置运行 CLI

```bash
$ wordway -V
```

> 完整的命令说明，请查看 [wordway-cli](https://github.com/wordway/wordway-cli) 代码库。

## 创建一个单词本

```
$ wordway wordbook new example
```

执行命令成功后，你会在当前文件夹下得到 `wordbook-example`  文件夹，该文件包含一个用于描述单词本的  `wordbook.yaml` 文件。

```yaml
wordway: "1.0.0"
info:
  slug: "example"
  title: "Example"
  summary: ""
  tags:
    - wordway
    - example
  visibility: "public"
  difficulty_level: "D1"
  repository_type: ""
  repository_url: ""
  author: ""
  author_email: ""
  author_link: ""
words:
  -
   word: hello
  -
   word: world
```

### 标题及简介
```yaml
info:
  title: "示例"
  summary: "一个单词本示例"
```

### 标签

```yaml
info:
  tags:
   - "wordway"
   - "example"
```

### 可见性

可选值：
- `public` 公开（仅管理员可创建）
- `private` 私有（仅自己可见）

```yaml
info:
  visibility: "public"
```

### 难度等级

可选值：
- `D1` 简单
- `D2` 中等
- `D3` 困难
- `D4` 挑战

```yaml
info:
  difficulty_level: "D1"
```

### 代码库

我们建议你通过 GitHub 管理你的单词本，可以让更多人共同参与完善单词本。

```yaml
info:
  repository_type: "git"
  repository_url: "https://github.com/wordway/wordbook-example"
```

### 作者

请务必添加作者信息，方便使用者可以联系到你。

```yaml
info:
  author: "JianyingLi"
  author_email: "lijy91@foxmail.com"
  author_link: "https://github.com/lijy91"
```

### 单词

你仅需将单词添加到以下节点中，系统会将该单词的音标发音及释义等信息补充完整。

```yaml
words:
  -
   word: hello
  -
   word: world
```

> 如果你的单词本单词较多需要进行分组时，你可以通过将单词拆分成不同的章节来进行管理，具体示例请参考  [wordbook-basic-english](https://github.com/wordway/wordbook-basic-english) 单词本。

现在，你可以根据以上说明编辑该文件将你的单词添加到单词本中。

## 构建 README

```
$ wordway wordbook gendoc
```

## 发布单词本

```
$ wordway wordbook publish
```

> 发布前请执行 `wordway login` 登录到你的 wordway 账号。

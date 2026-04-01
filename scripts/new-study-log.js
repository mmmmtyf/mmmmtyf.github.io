import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dayjs from 'dayjs';
import { createInterface, question } from './prompt-helper.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsDir = path.join(__dirname, '..', 'content', 'posts');

// 二战开始日期（可以修改为你实际的二战开始日期）
const START_DATE = '2026-03-01';

const exitWithError = (rl, message) => {
  console.error(message);
  rl.close();
  process.exit(1);
};

// 计算今天是二战第几天
const getDayCount = (dateStr) => {
  const start = dayjs(START_DATE);
  const today = dayjs(dateStr);
  return today.diff(start, 'day') + 1;
};

// 生成文件名：YYYY-MM-DD-dayX
const generatePostUrl = (dateStr, dayCount) => {
  return `${dateStr}-day${dayCount}`;
};

const isUrlTaken = (url) => fs.existsSync(path.join(postsDir, url));

const generateStudyLogTemplate = (dateStr, dayCount) => {
  const dateObj = dayjs(dateStr);
  const weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][dateObj.day()];
  
  return `---
title: "二战考研 Day ${dayCount} | ${dateStr} ${weekday}"
date: ${dateStr}
categories:
  - 考研打卡
tags:
  - 二战考研
  - 学习记录
---

# 📚 二战考研 Day ${dayCount}

> 📅 **日期**: ${dateStr} ${weekday}  
> ⏱️ **学习时长**: ___ 小时  
> 🎯 **完成度**: ___%

---

## ✅ 今日任务清单

### 数学
- [ ] 
- [ ] 

### 英语
- [ ] 
- [ ] 

### 专业课
- [ ] 
- [ ] 

### 政治
- [ ] 
- [ ] 

---

## 📝 学习记录

### 数学
<!-- 记录今天学了什么、遇到的难点、解题思路 -->


### 英语
<!-- 单词背诵量、阅读进度、作文练习等 -->


### 专业课
<!-- 章节进度、理解程度、需要复习的点 -->


### 政治
<!-- 如果有学的话 -->


---

## 📷 手写笔记

> 拍照上传今天的手写笔记，放在这个目录下，用相对路径引用

### 笔记1
\`\`\`markdown
![笔记1](./notes/note1.jpg)
\`\`\`

### 笔记2
\`\`\`markdown
![笔记2](./notes/note2.jpg)
\`\`\`

---

## 💭 今日复盘

### 做得好
- 

### 做得不好
- 

### 明日计划
- 

### 心情/状态
<!-- 记录今天的心情，备考的压力、动力、迷茫都可以写 -->


---

## 🔗 相关链接

<!-- 打卡导航 -->
- [查看所有打卡](/posts)

---

*Keep going! 清华在等你 🎋*
`;
};

async function main() {
  const rl = createInterface();

  try {
    console.log('🎋 二战考研学习打卡生成器\n');
    
    // 默认使用今天的日期
    const today = dayjs().format('YYYY-MM-DD');
    const dateInput = await question(rl, `📅 请输入日期（默认今天 ${today}，格式 YYYY-MM-DD）: `);
    const dateStr = dateInput.trim() || today;
    
    // 验证日期格式
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      exitWithError(rl, '❌ 错误：日期格式不正确，请使用 YYYY-MM-DD 格式');
    }
    
    const dayCount = getDayCount(dateStr);
    const postUrl = generatePostUrl(dateStr, dayCount);
    
    // 检查是否已存在
    if (isUrlTaken(postUrl)) {
      exitWithError(rl, `❌ 错误：${postUrl} 已存在，不要重复打卡哦！`);
    }
    
    const newPostDir = path.join(postsDir, postUrl);
    const readmePath = path.join(newPostDir, 'README.md');
    const notesDir = path.join(newPostDir, 'notes');
    
    // 创建目录
    fs.mkdirSync(newPostDir, { recursive: true });
    fs.mkdirSync(notesDir, { recursive: true });
    
    // 写入模板
    const templateContent = generateStudyLogTemplate(dateStr, dayCount);
    fs.writeFileSync(readmePath, templateContent, 'utf8');
    
    console.log('\n✅ 学习打卡创建成功！');
    console.log(`📂 路径: ${readmePath}`);
    console.log(`📅 日期: ${dateStr}`);
    console.log(`🔢 二战第 ${dayCount} 天`);
    console.log(`🔗 URL: ${postUrl}`);
    console.log(`\n📸 手写笔记目录: ${notesDir}`);
    console.log('   把你的手写笔记拍照放在这里，用 ./notes/xxx.jpg 引用');
    console.log('\n现在可以开始编辑你的打卡内容了！加油 💪');
    
    rl.close();
  } catch (error) {
    if (error instanceof Error) {
      console.error('❌ 发生错误:', error.message);
    } else {
      console.error('❌ 发生错误: 未知错误');
    }
    rl.close();
    process.exit(1);
  }
}

main();

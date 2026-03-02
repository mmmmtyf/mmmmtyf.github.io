<template>
  <footer>
    <div>
      <!-- 替换为你的昵称 mmmmtyf -->
      <p class="text-sm text-neutral-500 dark:text-neutral-400">
        @{{ currentYear }} mmmmtyf🤔
      </p>
      <!-- 保留 Powered by 链接（如需删除可直接删掉这整段） -->
      <a
        class="text-sm text-neutral-500 dark:text-neutral-400"
        href="https://github.com/dyedd/serenade"
        target="_blank"
        >Powered by serenade</a
      >
      <p class="text-sm text-neutral-500 dark:text-neutral-400">
        本站已运行 {{ runningDays }} 天
      </p>
      <!-- 备案号已删除 -->
    </div>
    <div
      class="flex flex-wrap items-center justify-center gap-x-4 sm:items-center"
    >
      <p class="text-sm text-neutral-500 dark:text-neutral-400">找到我</p>
      <!-- 替换为你的 GitHub 用户名 mmmmtyf -->
      <a
        class="inline-block p-2 sm:hover:text-link"
        href="https://github.com/mmmmtyf"
        target="_blank"
      >
        <svg class="icon" aria-hidden="true" width="2.2rem" height="2.2rem">
          <use xlink:href="#icon-github"></use>
        </svg>
      </a>
      <!-- 替换为你的邮箱 menglingxuan111@qq.com -->
      <a
        class="inline-block p-2 sm:hover:text-link"
        href="mailto:menglingxuan111@qq.com"
        target="_blank"
      >
        <svg class="icon" aria-hidden="true" width="2.2rem" height="2.2rem">
          <use xlink:href="#icon-youxiang"></use>
        </svg>
      </a>
      <!-- QQ 链接已删除 -->
    </div>
  </footer>
</template>

<script setup>
import { siteConfig } from '../../site.config'

const currentYear = new Date().getFullYear()

const calculateRunningDays = (startTime) => {
  const start = new Date(startTime)

  if (Number.isNaN(start.getTime())) {
    return 0
  } else {
    const now = new Date()
    const diffTime = now.getTime() - start.getTime()
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    return days
  }
}

// 如需自定义站点运行起始时间，修改 site.config 里的 startTime
// 若无 site.config，可替换为具体日期，例如：calculateRunningDays("2026-03-02")
const runningDays = calculateRunningDays(siteConfig.startTime)
</script>

<style lang="scss" scoped>
footer {
  padding: 2.5rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 60rem;
  margin: auto;
  font-size: 1rem;
  line-height: 0.75rem;

  div {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    &.flex {
      flex-direction: row;
      align-items: center;
    }
  }

  a {
    transition: color 0.3s ease;
    &:hover {
      color: var(--color);
    }
  }
}

@media screen and (max-width: 768px) {
  footer {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
    padding: 2rem 1rem;

    div {
      gap: 0.6rem;

      &.flex {
        gap: 1rem;
      }
    }
  }
}

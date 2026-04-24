// 配置你的DeepSeek API Key（免费）
const DEEPSEEK_API_KEY = '你的免费API密钥';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const GITEE_REPO = '你的用户名/你的仓库名'; // 用于提交错误日志

async function analyze(mode) {
  // 1. 获取学生上传的图片和描述
  const imageFile = document.getElementById(mode === 'preCheck' ? 'preCheckImage' : 'faultImage').files[0];
  const problemText = mode === 'fault' ? document.getElementById('problemDesc').value : '请检查电路接线和参数设置。';

  // 2. 调用DeepSeek API（多模态，支持图片）
  const result = await callDeepSeekAPI(imageFile, problemText, mode);

  // 3. 在页面显示AI结果
  document.getElementById(`${mode}Result`).innerHTML = formatAIResult(result);

  // 4. （关键！）将错误日志自动提交到Gitee Issues，形成数据沉淀
  if (result.hasError) {
    await submitErrorLogToGitee(result);
  }
}

// 提交错误日志到Gitee Issues（免费的数据存储）
async function submitErrorLogToGitee(errorData) {
  // 使用Gitee的API，创建一个新的Issue
  // 这将自动在你的仓库中生成一条包含错误类型、时间、建议的记录
  // 为教师看板提供数据源
}
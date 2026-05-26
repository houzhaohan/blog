<template>
  <div class="post-content">
    <h2>1. 线性模型</h2>
    <p><strong>表达式：</strong></p>
    <div class="math-block" v-html="katexFormula1"></div>
    <ul>
      <li><span v-html="katexW"></span>：权重</li>
      <li><span v-html="katexB"></span>：偏置</li>
      <li><span v-html="katexX"></span>：输入特征</li>
      <li><span v-html="katexY"></span>：预测值</li>
    </ul>

    <hr />

    <h2>2. 损失函数</h2>
    <p>均方误差 MSE <strong>公式：</strong></p>
    <div class="math-block" v-html="katexMSE"></div>
    <ul>
      <li><span v-html="katexN"></span>：样本总数</li>
      <li><span v-html="katexYi"></span>：真实值</li>
      <li><span v-html="katexYhat"></span>：预测值（即 <span v-html="katexWXB"></span>）</li>
    </ul>
    <p><strong>作用：</strong>衡量预测值与真实值之间的差距</p>

    <hr />

    <h2>3. 梯度下降法</h2>
    <p><strong>核心思想：</strong><br />沿着损失函数<strong>偏导数的反方向</strong>更新参数，使损失逐渐减小。</p>
    <p><strong>参数更新规则：</strong></p>
    <div class="math-block" v-html="katexUpdateW"></div>
    <div class="math-block" v-html="katexUpdateB"></div>
    <ul>
      <li><span v-html="katexEta"></span>（学习率）：控制每次更新的步长
        <ul>
          <li>过小：收敛慢</li>
          <li>过大：可能震荡或不收敛</li>
        </ul>
      </li>
    </ul>

    <hr />

    <h2>4. 正则化</h2>
    <p>防止过拟合</p>
    <BlogStyles
      type="table"
      :tableData="regularizationTable"
      :columns="regularizationColumns"
    />
    <ul>
      <li><span v-html="katexLambda"></span>：正则化强度超参数</li>
      <li><strong>作用：</strong>限制权重过大，提升模型泛化能力</li>
    </ul>

    <hr />

    <h2>5. 梯度计算</h2>
    <p>对 MSE 求偏导：</p>
    <div class="math-block" v-html="katexDw"></div>
    <div class="math-block" v-html="katexDb"></div>
    <p>带入梯度下降公式即可迭代更新。</p>

    <hr />

    <h2>6. 完整流程</h2>
    <h4>神经网络训练的整体流程</h4>
    <el-timeline>
      <el-timeline-item timestamp="Step 1" placement="top">
        <h4>输入数据</h4>
        <p>x</p>
      </el-timeline-item>
      <el-timeline-item timestamp="Step 2" placement="top">
        <h4>前向传播</h4>
        <p>模型计算预测值：ŷ</p>
      </el-timeline-item>
      <el-timeline-item timestamp="Step 3" placement="top">
        <h4>计算损失</h4>
        <p>使用损失函数：L(ŷ, y)</p>
      </el-timeline-item>
      <el-timeline-item timestamp="Step 4" placement="top">
        <h4>反向传播</h4>
        <p>计算梯度：∂L/∂w</p>
      </el-timeline-item>
      <el-timeline-item timestamp="Step 5" placement="top">
        <h4>梯度下降更新参数</h4>
        <p>更新：w, b</p>
      </el-timeline-item>
      <el-timeline-item timestamp="Step 6" placement="top">
        <h4>重复训练</h4>
        <p>直到损失足够小。</p>
      </el-timeline-item>
    </el-timeline>

    <h2>7. PyTorch实现示例</h2>
    <BlogStyles
      type="code"
      codeTitle="PyTorch 线性回归示例"
      language="python"
      :codeContent="pytorchCode"
    />

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BlogStyles from '../../components/BlogStyles.vue'
import katex from 'katex'
import 'katex/dist/katex.min.css'

const katexFormula1 = ref('')
const katexW = ref('')
const katexB = ref('')
const katexX = ref('')
const katexY = ref('')
const katexMSE = ref('')
const katexN = ref('')
const katexYi = ref('')
const katexYhat = ref('')
const katexWXB = ref('')
const katexUpdateW = ref('')
const katexUpdateB = ref('')
const katexEta = ref('')
const katexLambda = ref('')
const katexDw = ref('')
const katexDb = ref('')

const regularizationTable = ref([
  { type: 'L1 正则化（Lasso）', formula: '新损失函数 = 损失函数L + λ∑|w|', feature: '产生稀疏权重（部分特征无效），可用于特征选择' },
  { type: 'L2 正则化（Ridge）', formula: '新损失函数 = 损失函数L + λ∑w²', feature: '权重平滑衰减，不产生稀疏，更常用' }
])

const regularizationColumns = ref([
  { prop: 'type', label: '类型', minWidth: 180 },
  { prop: 'formula', label: '公式（加到损失函数后）', minWidth: 280 },
  { prop: 'feature', label: '特点', minWidth: 250 }
])

const pytorchCode = ref(`import torch

# 1. 模拟数据 
# 假定：y = 2x + 1 
x = torch.tensor([[1.0], [2.0], [3.0], [4.0]], dtype=torch.float32)  # 输入x 
y = torch.tensor([[3.0], [5.0], [7.0], [9.0]], dtype=torch.float32)  # 真实值y 

# 2. 定义线性模型 
# y = wx + b 
model = torch.nn.Linear(in_features=1, out_features=1, bias=True) 

# 3. 定义损失函数（MSE） 
criterion = torch.nn.MSELoss() 

# 4. 定义优化器（梯度下降） 
optimizer = torch.optim.SGD(model.parameters(), lr=0.01)  # lr=学习率η 

# 5. 训练循环 
epochs = 100  # 100轮 
for epoch in range(epochs): 
    # Step 1：前向传播 → 算预测值 
    y_pred = model(x) 

    # Step 2：计算损失 
    loss = criterion(y_pred, y) 

    # Step 3：反向传播 → 算梯度 
    optimizer.zero_grad()  # 清空旧梯度 
    loss.backward()        # 自动求导 

    # Step 4：梯度下降 → 更新 w, b 
    optimizer.step() 

    # 打印训练过程 
    print(f"轮数 [{epoch+1}/{epochs}], 损失: {loss.item():.4f}") 

# 6. 查看训练结果 
print("\\n训练结束") 
print(f"学到的权重 w: {model.weight.item():.3f}") 
print(f"学到的偏置 b: {model.bias.item():.3f}") 
print("理想值：w=2, b=1")`)

onMounted(() => {
  katexFormula1.value = katex.renderToString('y = wx + b', { displayMode: true })
  katexW.value = katex.renderToString('w', { displayMode: false })
  katexB.value = katex.renderToString('b', { displayMode: false })
  katexX.value = katex.renderToString('x', { displayMode: false })
  katexY.value = katex.renderToString('y', { displayMode: false })
  katexMSE.value = katex.renderToString('L(w,b) = \\frac{1}{N} \\sum_{i=1}^{N} (y_i - \\hat{y}_i)^2', { displayMode: true })
  katexN.value = katex.renderToString('N', { displayMode: false })
  katexYi.value = katex.renderToString('y_i', { displayMode: false })
  katexYhat.value = katex.renderToString('\\hat{y}_i', { displayMode: false })
  katexWXB.value = katex.renderToString('wx_i + b', { displayMode: false })
  katexUpdateW.value = katex.renderToString('w = w - \\eta \\frac{\\partial L}{\\partial w}', { displayMode: true })
  katexUpdateB.value = katex.renderToString('b = b - \\eta \\frac{\\partial L}{\\partial b}', { displayMode: true })
  katexEta.value = katex.renderToString('\\eta', { displayMode: false })
  katexLambda.value = katex.renderToString('\\lambda', { displayMode: false })
  katexDw.value = katex.renderToString('\\frac{\\partial L}{\\partial w} = \\frac{2}{N} \\sum_{i=1}^{N} (w x_i + b - y_i) \\cdot x_i', { displayMode: true })
  katexDb.value = katex.renderToString('\\frac{\\partial L}{\\partial b} = \\frac{2}{N} \\sum_{i=1}^{N} (w x_i + b - y_i)', { displayMode: true })
})
</script>

<style scoped>
.math-block {
  overflow-x: auto;
  padding: 10px 0;
}
</style>

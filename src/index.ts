import path from 'path'
// import moment = from 'moment'
import * as f from 'billyxin-files'
// import dirName = moment().format('YYMMDD')
import datas from './db.json'

// 单文件集汇集复制入第一目录集n份 主要功能是汇集多处文件
const dirName = 'shortkeys'
let countFilesChanged = 0
function copies() {
  let t = Date.now()
  datas.toDirs0.forEach((dirRoot) => {
    let dir_dest = path.join(dirRoot, dirName)
    let n = f.copyFiles(datas.fromFiles, dir_dest)
    countFilesChanged += n
  })
  t = (Date.now() - t) / 1000
  console.log('Copies Time Used: ' + t)
}

// 目录汇集复制入第一目录集n份 主要功能是汇集多处目录
// a/*.* -> b/sub/*.* sub为读取src的下一级目录
function backups() {
  let t = Date.now()
  datas.toDirs.forEach((pathDest) => {
    datas.fromDirs.forEach((pathFrom) => {
      f.copyDir(
        { src: pathFrom, dest: path.join(pathDest, path.basename(pathFrom)), ignores: datas.ignores },
        true,
        (n) => {
          countFilesChanged += n
        }
      )
    })
  })
  t = (Date.now() - t) / 1000
  console.log('Backups Time Used: ' + t)
}

// 第一目录集的第一个目录镜像复制n份入第二个目录集 汇集好的目录取一个再异盘镜像
// 复制目录结构： a/*.* -> b/*.*  a和b不显示，需明确指明。仅目录下内容对拷
function backups2() {
  let t = Date.now()
  datas.toDirs2.forEach((pathDest) => {
    f.copyDir({ src: datas.toDirs[0], dest: pathDest, ignores: datas.ignores }, true, (n) => {
      countFilesChanged += n
    })
  })
  t = (Date.now() - t) / 1000
  console.log('Backups Time Used: ' + t)
}

let t = Date.now()

console.log('-------------- Copies Start ---------------')
copies()
console.log('--------------- Copies End ----------------')

console.log('-------------- Backup1 Start --------------')
backups()
console.log('--------------- Backup1 End ---------------')

console.log('-------------- Backup2 Start --------------')
backups2()
console.log('--------------- Backup2 End ---------------')

t = (Date.now() - t) / 1000

console.log('===========================================')
console.log(' ')
console.log('            All Time Used:  ' + t.toFixed(2) + 's')
console.log('         All Files Copied:  ' + countFilesChanged)
console.log('          Average Files/s:  ' + (countFilesChanged / t).toFixed(1))
console.log(' ')
console.log('===========================================')

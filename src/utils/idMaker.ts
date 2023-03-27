import { v4 } from 'uuid'

const IdMaker = {
  generate():string {
    return v4()
  }
}

export default IdMaker
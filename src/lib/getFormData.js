export const
  getFormData = (formData) => {
    let resultData={}
    for(name in formData){
      resultData[name]=formData[name]
    }
    return resultData
  }
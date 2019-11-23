let loopIsShowMenu=(menuList) =>{
	let _menuAll=[]
	for(let i=0;i<menuList.length;i++){
		if(menuList[i].isShow=="1"){
				if(menuList[i].iTaskInfo){
					menuList[i].iTaskInfo.menu=loopIsShowMenu(menuList[i].iTaskInfo.menu)
					_menuAll.push(menuList[i])
				}else{
					_menuAll.push(menuList[i])
				}
		}
	}
	return _menuAll
}

export const isShowMenu=(menuAll) => {
	return loopIsShowMenu(menuAll)
}
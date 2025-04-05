const BASE_URL="https://www.combinecalculate.cn"
const TEST_URL="http://127.0.0.1:3000"
export function request(config = {}){
	let {url,method="GET",header={},data={} }= config
	return new Promise((resolve,reject)=>{
		url = BASE_URL+url
		uni.request({
			url,
			data,
			method,
			header,
			success:res=>{
				const requestData = res.data.body
				if(requestData.errCode===200){//成功
					
					resolve(requestData)
				}else if(requestData.errCode ===400){
					uni.showModal({
						title:"错误提示",
						content:requestData.errMsg,
						showCancel:false
					})

					reject(requestData)
				}else if(requestData.errCode ===404){
					uni.showModal({
						title:"错误提示",
						content:requestData.errMsg,
						showCancel:false
					})
					reject(requestData)
				}
				else{
					
					uni.showToast({
						title:requestData.errMsg,
						icon:"none"
					})
					reject(requestData)
				}
				
			},
			fail:res=> {
				uni.showToast({
					title: "网络错误，请稍后重试",
					icon: "none"
				  });
				  console.error("Request failed:", res);
				  reject(res);
			}
		})
	})
	
} 

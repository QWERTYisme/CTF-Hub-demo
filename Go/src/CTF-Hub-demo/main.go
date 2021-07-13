package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// 导入gin包

type Challenge struct {
	Id      int    `json:"id"`
	Title   string `json:"title"`
	Content string `json:"content"`
	Flag    string `json:"flag"`
}

// 入口函数
func main() {

	//data, _ := json.Marshal(Challenges)
	// 初始化一个http服务对象
	var info []Challenge
	data, err := ioutil.ReadFile("./data.json")
	err = json.Unmarshal(data, &info)
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	r := gin.Default()

	r.GET("/getChallenges", func(c *gin.Context) {
		method := c.Request.Method
		origin := c.Request.Header.Get("Origin")
		if origin != "" {
			c.Header("Access-Control-Allow-Origin", "http://139.224.207.0") // 可将将 * 替换为指定的域名
			c.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
			c.Header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
			c.Header("Access-Control-Expose-Headers", "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Cache-Control, Content-Language, Content-Type")
			c.Header("Access-Control-Allow-Credentials", "true")
		}
		if method == "OPTIONS" {
			c.JSON(http.StatusOK, "ok!")
		}
		// 通过请求上下文对象Context, 直接往客户端返回一个json

		c.JSON(200, info)
	})

	r.GET("/checkFlag", func(c *gin.Context) {
		method := c.Request.Method
		origin := c.Request.Header.Get("Origin")
		if origin != "" {
			c.Header("Access-Control-Allow-Origin", "http://139.224.207.0") // 可将将 * 替换为指定的域名
			c.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
			c.Header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
			c.Header("Access-Control-Expose-Headers", "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Cache-Control, Content-Language, Content-Type")
			c.Header("Access-Control-Allow-Credentials", "true")
		}
		if method == "OPTIONS" {
			c.JSON(http.StatusOK, "ok!")
		}
		flag := c.Query("flag")
		id, err := strconv.Atoi(c.Query("id"))
		if err != nil {
			println("converted failed")
		}
		if flag != info[id-1].Flag {
			c.JSON(200, "error")
		} else {
			c.JSON(200, "success")
		}
	})

	r.Run(":8000") // 监听并在 0.0.0.0:8080 上启动服务

	/*
		var info []Challenge
		data, err := ioutil.ReadFile("./data")
		err = json.Unmarshal(data, &info)
		if err != nil {
			fmt.Println(err.Error())
			return
		}
		fmt.Println(info)
	*/
	// 反序列化json数据
}

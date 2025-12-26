### 상위 10명의 기록을 확인합니다.
GET http://localhost:8080/api/v1/records
{
  "rankList": [
    {
      "id": 1,
      "name": "aasd",
      "score": 0.133333
    },
    {
      "id": 46355,
      "name": "User_46353",
      "score": 0.416667
    },
    {
      "id": 3674,
      "name": "User_3672",
      "score": 0.706667
    },
    {
      "id": 72845,
      "name": "User_72843",
      "score": 0.79
    },
    {
      "id": 47082,
      "name": "User_47080",
      "score": 0.933333
    },
    {
      "id": 51147,
      "name": "User_51145",
      "score": 0.996667
    },
    {
      "id": 2,
      "name": "aasasdd",
      "score": 1.0
    },
    {
      "id": 48178,
      "name": "User_48176",
      "score": 1.09
    },
    {
      "id": 57542,
      "name": "User_57540",
      "score": 1.17
    },
    {
      "id": 53381,
      "name": "User_53379",
      "score": 1.32333
    }
  ]
}

# 기록을 등록합니다. name은 unique합니다.
POST http://localhost:8080/api/v1/records
Content-Type: application/json

{
  "name": "",
  "attempt1": 0,
  "attempt2": 0,
  "attempt3": 0
}

### 내 기록을 확인합니다. 내 기록에서 상위 5명 하위 5명의 기록을 확인합니다.
GET http://localhost:8080/api/v1/records/me?name={name}
{
  "rankList": [
    {
      "id": 9668,
      "name": "User_9666",
      "score": 98.53
    },
    {
      "id": 69500,
      "name": "User_69498",
      "score": 98.5967
    },
    {
      "id": 99836,
      "name": "User_99834",
      "score": 98.63
    },
    {
      "id": 46101,
      "name": "User_46099",
      "score": 98.7433
    },
    {
      "id": 28366,
      "name": "User_28364",
      "score": 98.8133
    },
    {
      "id": 14479,
      "name": "User_14477",
      "score": 98.8567
    },
    {
      "id": 92790,
      "name": "User_92788",
      "score": 98.87
    },
    {
      "id": 8239,
      "name": "User_8237",
      "score": 98.9233
    },
    {
      "id": 70111,
      "name": "User_70109",
      "score": 99.0033
    },
    {
      "id": 51661,
      "name": "User_51659",
      "score": 99.2133
    },
    {
      "id": 7666,
      "name": "User_7664",
      "score": 99.2567
    }
  ]
}
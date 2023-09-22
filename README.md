# 템플릿 프로젝트


### GitHub Action을 위한 Secrets를 설정

1. GitHub 레포지토리에 이동
2. 레포지토리 상단의 메뉴에서 "Settings"를 클릭
3. 왼쪽 사이드바에서 "Secrets and variables" -> "Actions" 라는 탭을 선택
4. "New repository secret" 또는 "New organization secret" 버튼을 클릭하여 새 비밀 값을 만든다.
5. 각 비밀 값을 만들 때 이름 (예: AWS_S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION)과 해당 값을 입력한다. 이 비밀 값은 나중에 GitHub Actions 워크플로우에서 사용됨
6. 값을 입력한 후에는 "Add secret" 또는 "Create secret" 버튼을 클릭하여 비밀 값을 저장

### S3 버킷 설정
1. s3 버킷애 권한 탭에서 버킷 정책을 아래와 같이 설정한다.
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::your-bucket-name/*"
        }
    ]
}
```

2. 속성 탭에서 스크롤 맨 밑으로 내리면 보이는 정적 웹 사이트 호스팅 설정을 해준다. 이때,인덱스 문서, 오류 문서 모두 index.html로 설정한다.

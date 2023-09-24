# 템플릿 프로젝트


### GitHub Action을 위한 Secrets를 설정

1. GitHub 레포지토리에 이동
2. 레포지토리 상단의 메뉴에서 "Settings"를 클릭
3. 왼쪽 사이드바에서 "Secrets and variables" -> "Actions" 라는 탭을 선택
4. "New repository secret" 또는 "New organization secret" 버튼을 클릭하여 새 비밀 값을 만든다.
5. 각 비밀 값을 만들 때 이름 (예: AWS_S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION)과 해당 값을 입력한다. 이 비밀 값은 나중에 GitHub Actions 워크플로우에서 사용됨
6. 값을 입력한 후에는 "Add secret" 또는 "Create secret" 버튼을 클릭하여 비밀 값을 저장

### S3 버킷 설정
1. 버킷 생성 시 **S3 버킷은 생성할 도메인명과 일치해야한다.**(www.abc.com이 도메인명이면 버킷 이름도 www.abc.com)
2. ACLs enabled 로 선택한다.
3. Block all public access 체크를 해제하고 I acknowledge that the current settings might result in this bucket and the objects within becoming public. 을 체크한 후 생성한다.
4. 속성에가서 정적 웹 호스팅 생성을 클릭한 후 html 설정을 error하고 index 모두다 index.html로 설정한다.


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


### Route53, 도메인 연결 방법
1. Route53으로 이동 후 도메인 등록을 클릭한다.
2. 도메인 가용성 확인 후 선택을 클릭하고 결제를 진행한다.
3. Route53 사이드바에서 도메인 -> 요청 페이지에가서 요청한 도메인 상태가 완료될때까지 기다린다.
4. 호스트 존 -> 생성된 도메인 링크를 클릭 -> 레코드 생성을 누른다.
5. Alias를 활성화한 후 라우트 트래픽 대상을 `Alias to S3 website endpoint`로 선택한 뒤 `버킷 리전`에 맞는 리전을 선택한 후 정적 웹호스팅한 버킷 명을 선택하고 레코드 생성을 클릭한다.

### AWS Certificate Manager (ACM)에서 SSL/TLS 인증서 발급

1. ACM(Certificate Manager) 콘솔로 이동
2. 사이드바에서 "인증서 요청" 버튼을 클릭
3. 퍼블릭 인증서 요청 선택 후 다음 클릭
4. 완전히 정규화된 도메인 이름은 (www.abd.com)인 경우 *.abc.com해서 서브도메인도 연결될 수 있도록한다.
5. DNS 검증을 선택하고 요청을 누른다.
6. 생성된 요청 링크 들어가서 `Route 53에서 레코드 생성` 을 클릭하고 레코드 생성을 클릭한다.
7. 검증시간은 30분 정도 소요된다.
8. 발급되면 CloudFront로 이동하고 Distributions를 클릭하고 Create distribution를 클릭한다.
9. `Origin domain`을 Amazon S3 리스트중 내 도메인에 맞는 정적 웹사이트 주소를 선택한 후 `Default root object - optional` 를 `index.html`로 설정한다.
10. `Viewer protocol policy`를 `Redirect HTTP to HTTPS`로 선택하고 `Allowed HTTP methods`를 `GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE`로 선택한다음 `OPTIONS`를 체크한다.
11. `Web Application Firewall (WAF)`를 `Do not enable security protections`로 선택한다.
12. `Custom SSL certificate - optional`를 아까 발급한 인증서를 선택하고 `Create distribution`를 누른다.
13. `CloudFront - Security - Origin access - Identities (legacy)탭` 메뉴에 접근 후, `Create origin access identity` 버튼을 클릭해서 `Name`을 도메인 이름으로 생성한다.
14. 생성된 Origin access identities ID를 복사한다.
15. 해당 S3의 Bucket Policy에서 아래와 같이 내용 추가를한다.
```
{
    "Version": "2012-10-17",
    "Id": "PolicyForCloudFrontPrivateContent",
    "Statement": [
        {
            "Sid": "Allow-OAI-Access-To-Bucket",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity [아까복사한Origin access identities ID]"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::버킷명/*"
        },
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::버킷명/*"
        }
    ]
}
```
16. CloudFront - Distributions - 아까 생성한 클라우드 프론트 ID를 누른 후 Settings의 Edit을 누르고 Alternate domain name (CNAME) - optional에 `*.abc.com`, `www.abc.com` 두개를 추가하고 Last modified Deploying 이 끝날때까지 기다린다.
17. Route53에서 도메인 클릭 후 `www.woocobang.com`으로 `A레코드`, `AAAA레코드` 두개를 CloudFront로 연결하여 생성한다.
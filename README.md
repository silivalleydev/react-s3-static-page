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

1. ACM 콘솔로 이동
2. "인증서 생성" 버튼을 클릭
3. 인증서를 요청하는 페이지에서 도메인 이름을 입력하고 "다음"을 클릭
4. 인증서 유형을 선택합니다. 가장 일반적으로는 "공인 인증서"를 선택
5. 인증서를 검증하는 방법을 선택하고 "다음"을 클릭한다. DNS 검증을 선택하면 DNS 레코드를 통해 도메인 소유권을 확인
6. 리뷰 페이지에서 요청을 검토하고 "인증서 생성"을 클릭
7. ACM은 도메인 소유권을 확인하고 SSL/TLS 인증서를 발급합니다. 이 과정은 몇 분 정도 소요됨

### SSL/TLS 인증서를 로드 밸런서 또는 CloudFront에 연결

1. 원하는 AWS 서비스(로드 밸런서, CloudFront 등)에서 SSL/TLS 인증서를 사용하도록 설정
2. 인증서 연결
    - AWS Load Balancer 사용 시: Load Balancer 구성에서 SSL/TLS 인증서를 연결하고, 리스너 설정에서 HTTPS를 활성화
    - AWS CloudFront 사용 시: CloudFront 배포 설정에서 "대체 도메인 이름(CNAME)"을 구성하고, "SSL 인증서"를 선택하여 ACM에서 생성한 인증서를 연결합니다.

### Route 53에서 DNS 레코드 설정

1. Route 53 콘솔로 이동
2. 해당 호스팅 영역(도메인)을 선택하고, 관리하려는 레코드 세트를 편집
3. 레코드 세트 유형을 "A 레코드 - IPv4 주소" 또는 "CNAME 레코드 - 별칭"으로 선택
4. "라우팅 방법"을 "간단한 라우팅"으로 설정하고, 연결하려는 AWS 서비스(로드 밸런서 또는 CloudFront)의 DNS 이름을 선택
5. 변경 사항을 저장
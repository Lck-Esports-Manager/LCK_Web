# 설치 방법

## 1. 선행조건

파이썬 가상환경, npm, react-create-app 이 설치되어있다는 것을 가정으로 합니다.

## 2. 자신의 가상환경에 진입해서 Git repo를 clone 한다

git clone https://github.com/Lck-Esports-Manager/Lck_web.git .

## 3. frontend 디렉토리에 가서 리액트 패키지를 설치한다

cd frontend  
npm install

## 4. root 디렉토리로 이동한 다음 가상환경 종속 패키지를 설치합니다.

cd ..  
pip install -r requirements.txt

## 5. migration을 실시합니다

python manage.py migrate

## 6. Django 서버를 실행합니다

python manage.py runserver react

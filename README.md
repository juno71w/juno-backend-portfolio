# 백엔드 포트폴리오 (Backend Portfolio)

## 소개
다양한 웹 기술과 실험적인 프로젝트를 모아둔 인터랙티브 프로젝트 허브입니다.
백엔드 개발 과정에서 마주하는 다양한 고민과 기술적 도전 과제들을 프로젝트로 구체화하여 해결 과정을 담았습니다.

## 사이트 링크
**[https://juno712.dev](https://juno712.dev)**

## 프로젝트 목록

### 1. 반응 속도 테스트 (Reaction Speed Test)
- **설명**: 사용자의 반응 속도를 밀리초(ms) 단위로 측정하고, 글로벌 랭킹 시스템을 통해 다른 사용자들과 경쟁할 수 있는 게임입니다.
- **주요 기술**: 
  - **Backend**: Spring Boot, Redis (Ranking), MySQL (Persistence)
- **특징**:
  - **정밀 측정**: 랜덤한 대기 시간 후 색상 변화를 감지하여 정확한 반응 속도 측정
  - **실시간 랭킹**: Redis Sorted Set을 활용한 고성능 실시간 리더보드 구현
  - **듀얼 모드**: MySQL(v1) 및 Redis(v2) API 서버 선택 가능

---
© 2025 Park Junho. All rights reserved.

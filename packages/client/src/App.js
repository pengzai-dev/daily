import './App.css';
import 'antd/dist/antd.min.css';
import { Button, Input, Row, Col, Layout } from 'antd';
import { useState } from 'react';
const { Header, Content, Footer } = Layout;
function App() {
    const [jsonStr, setJsonStr] = useState('');
    const [source, setSource] =
        useState(`+1、23716 -【药管】商城购物车O2O处方药不支持合并支付的特殊处理 开发100%  预发  提测3.8  暂定3.14发布 
    2、【技改】CMS 开放平台 - 沉浸式 开发100%    
    3、23731 -【企业】保代小程序接入商城  支持即可 0314发布
    4、22934 -【商城】 客服IM推送优惠券及活动  待开发 待排期
    +、24372 -【商城】商详页优化-用药助手  开发20%  待排期
    +6、24371 -【商城】处方药SKU弹盘优惠价  开发20%  3.23提测  3.29上线`);

    function parse() {
        const projectsStr = source.split('\n');
        const projects = projectsStr.map((item) => {
            return parseItem(item);
        });
        console.log(projects);
    }

    function parseItem(projectStr) {
        projectStr = projectStr.replace(/\s*\-\s*/g, '-');
        projectStr = projectStr.replace(/\，|、/g, ',');
        const projectArr = projectStr.split(/\s+|,|，|、/);
        console.log(projectArr);
        const projectJson = {};
        function isId(str) {
            const matched = str.match(/(\d+)-/g);
            return matched?.[0]?.replace('-', '');
        }
        function isPubTime(str) {
            const matched = str?.match(/排期|发布|上线/g);
            if (matched) {
                // 如果对日期有修饰
                const date = str?.match(/\d+(\.\d+)?/g);
                return date?.[0] || str;
            }
            return false;
        }
        function isTestTime(str) {
            const matched = str?.match(/提测/g);
            if (matched) {
                // 如果对日期有修饰
                const date = str?.match(/\d+(\.\d+)?/g);
                return date?.[0];
            }
            return false;
        }
        function isProcess() {
            // 开发10%，已提测，验证中，预发
        }
        console.log(isId(projectArr[1]));
        console.log(isPubTime(projectArr?.[3] || ''));

        const rules = [isId, isPubTime, isTestTime];
    }

    return (
        <Layout
            className="layout"
            style={{
                height: '100vh',
            }}
        >
            <Header>日报</Header>
            <Content
                style={{
                    padding: 20,
                }}
            >
                <Row>
                    <Col span="11">
                        <Input.TextArea
                            value={source}
                            size={'large'}
                            onChange={(e) => {
                                setSource(e.target.value);
                            }}
                            style={{
                                height: 400,
                            }}
                        />

                        <Button
                            className="mt-10"
                            onClick={(e) => {
                                parse();
                            }}
                        >
                            解析
                        </Button>
                    </Col>
                    <Col span="2"></Col>
                    <Col span="11">{source}</Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default App;

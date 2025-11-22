# mypy: allow-untyped-defs
"""Report test results in JUnit-XML format, for use with Jenkins and build
integration servers.

Based on initial code from Ross Lawley.

Output conforms to
https://github.com/jenkinsci/xunit-plugin/blob/master/src/main/resources/org/jenkinsci/plugins/xunit/types/model/xsd/junit-10.xsd
"""

from __future__ import annotations

from collections.abc import Callable
import functools
import os
import platform
import re
import xml.etree.ElementTree as ET

from _pytest import nodes
from _pytest import timing
from _pytest._code.code import ExceptionRepr
from _pytest._code.code import ReprFileLocation
from _pytest.config import Config
from _pytest.config import filename_arg
from _pytest.config.argparsing import Parser
from _pytest.fixtures import FixtureRequest
from _pytest.reports import TestReport
from _pytest.stash import StashKey
from _pytest.terminal import TerminalReporter
import pytest


xml_key = StashKey["LogXML"]()


def bin_xml_escape(arg: object) -> str:
    r"""Visually escape invalid XML characters.

    For example, transforms
        'hello\aworld\b'
    into
        'hello#x07world#x08'
    Note that the #xABs are *not* XML escapes - missing the ampersand &#xAB.
    The idea is to escape visually for the user rather than for XML itself.
    """

    def repl(matchobj: re.Match[str]) -> str:
        i = ord(matchobj.group())
        if i <= 0xFF:
... (truncated for brevity)